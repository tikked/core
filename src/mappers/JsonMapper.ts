import { Mapper } from '.';
import { ApplicationEnvironment } from '../domain/ApplicationEnvironment';
import * as t from 'io-ts';
import { reporter } from 'io-ts-reporters';
import { ContextSchema } from '../domain/ContextSchema';
import { Attribute } from '../domain/Attribute';
import { FeatureFlag } from '../domain/FeatureFlag';
import { Toggle } from '../domain/Toggle';
import { Context } from '../domain/Context';

export class JsonMapper implements Mapper<string> {
    static idNameDesc = {
        id: t.string,
        name: t.string,
        description: t.string
    };

    static contextDecoder = t.record(t.string, t.string);

    static toggleDecoder = t.type({
        isActive: t.boolean,
        context: JsonMapper.contextDecoder
    });

    static featureFlagDecoder = t.type({
        ...JsonMapper.idNameDesc,
        toggles: t.array(JsonMapper.toggleDecoder)
    });

    static attributeDecoder = t.type({
        ...JsonMapper.idNameDesc,
        weight: t.Int
    });

    static contextSchemaDecoder = t.type({
        attributes: t.array(JsonMapper.attributeDecoder)
    });

    static applicationEnvironmentdecoder = t.type({
        ...JsonMapper.idNameDesc,
        featureFlags: t.array(JsonMapper.featureFlagDecoder),
        contextSchema: JsonMapper.contextSchemaDecoder
    });

    map(input: string): ApplicationEnvironment {
        const parsed = JSON.parse(input);
        const decoded = JsonMapper.applicationEnvironmentdecoder.decode(parsed);
        const res = decoded.fold(
            errors => {
                const messages = reporter(decoded);
                throw new Error(messages.join('\n'));
            },
            value => value);
        return new ApplicationEnvironment(
            res.id,
            res.name,
            res.description,
            new ContextSchema(
                res.contextSchema.attributes.map(
                    attr => new Attribute(attr.id, attr.name, attr.description, attr.weight))),
            res.featureFlags.map(
                ff => new FeatureFlag(
                    ff.id,
                    ff.name,
                    ff.description,
                    ff.toggles.map(tog => new Toggle(tog.isActive, new Context(tog.context)))
                )
            )
        );
    }
}

import { Attribute } from './Attribute';
import { validateUniqueIds } from '../utils/Validators';
import '../utils/ArrayExtensions';
import { Context } from './Context';

export class ContextSchema {

    private attributes: Attribute[];

    constructor(attributes: Attribute[]) {
        validateUniqueIds(attributes);
        this.validateUniqueWeights(attributes);

        this.attributes = [...attributes];
    }

    get Attributes(): ReadonlyArray<Attribute> {
        return this.attributes;
    }

    private validateUniqueWeights(attributes: Attribute[]): any {
        const duplicates = attributes.map(x => x.Weight).duplicates();
        if (duplicates.length > 0) {
            throw new Error(`Duplicate weight values for attributes: ${duplicates}`);
        }
    }

    /**
     * Filters out non-existent attributes from the provided context and returns a new context,
     * which obey this schema
     * @param context The context to be filtered
     */
    public filterContext(context: Context): Context {
        return new Context(context.Keys
            .filter(key => this.attributes.some(attr => attr.Id === key))
            .reduce(
                (accu, curr) => ({...accu, [curr]: context.get(curr)}),
                <{[key: string]: string}>{}));
    }
}

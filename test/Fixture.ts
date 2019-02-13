import { FeatureFlag } from '../src/domain/FeatureFlag';
import { Toggle } from '../src/domain/Toggle';
import { Context } from '../src/domain/Context';

const defaultId = 'some_id';
const defaultName = 'some_name';
const defaultDescription = 'some_desc';

export function createFeatureFlag() {
    return new FeatureFlag(defaultId, defaultName, defaultDescription, [createToggle()]);
}

export function createToggle() {
    return new Toggle(true, createContext());
}

export function createContext() {
    return new Context({key: 'value'});
}

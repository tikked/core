import { FeatureFlag } from '../src/domain/FeatureFlag';
import { Toggle } from '../src/domain/Toggle';
import { Context } from '../src/domain/Context';
import { Attribute } from '../src/domain/Attribute';

export function createFeatureFlag(id?: string) {
    return new FeatureFlag(id || createId(), createName(), createDescription(), [createToggle()]);
}

export function createToggle() {
    return new Toggle(true, createContext());
}

export function createContext() {
    return new Context({key: 'value'});
}

let idCounter = 1;

export function createId() {
    return 'some_id' + idCounter++;
}

export function createName() {
    return 'some_name';
}

export function createDescription() {
    return 'some_desc';
}

export function createAttribute(id?: string, weight = 1) {
    return new Attribute(id || createId(), createName(), createDescription(), weight);
}

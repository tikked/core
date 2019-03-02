import { FeatureFlag } from '../src/domain/FeatureFlag';
import { Toggle } from '../src/domain/Toggle';
import { Context } from '../src/domain/Context';
import { Attribute } from '../src/domain/Attribute';
import { ContextSchema } from '../src/domain/ContextSchema';
import { ApplicationEnvironment } from '../src/domain/ApplicationEnvironment';

export function createFeatureFlag(id?: string) {
    return new FeatureFlag(id || createId(), createName(), createDescription(), [createToggle()]);
}

export function createToggle() {
    return new Toggle(true, createContext());
}

export function createContext() {
    return new Context({});
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

let weightCounter = 1;

export function createAttribute(id?: string, weight = 0) {
    return new Attribute(
        id || createId(),
        createName(),
        createDescription(),
        weight || weightCounter++);
}

export function createContextSchema(attrs: Attribute[] = []) {
    return new ContextSchema(attrs);
}

export function createApplicationEnvironment() {
    return new ApplicationEnvironment(
        createId(),
        createName(),
        createDescription(),
        createContextSchema(),
        []);
}

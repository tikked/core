import { ApplicationEnvironment } from '../src/domain/ApplicationEnvironment';
import { Attribute } from '../src/domain/Attribute';
import { Context } from '../src/domain/Context';
import { ContextSchema } from '../src/domain/ContextSchema';
import { FeatureFlag } from '../src/domain/FeatureFlag';
import { Toggle } from '../src/domain/Toggle';

export function createFeatureFlag(id?: string) {
    return new FeatureFlag(
        id || createId(),
        createName(),
        createDescription(),
        [createToggle()]);
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

let nameCounter = 1;
export function createName() {
    return 'some_name' + nameCounter++;
}

let descriptionCounter = 1;
export function createDescription() {
    return 'some_desc' + descriptionCounter++;
}

let weightCounter = 1;
export function createWeight() {
    weightCounter = weightCounter % 29;
    return weightCounter++;
}

export function createAttribute(id?: string, weight = 0) {
    return new Attribute(
        id || createId(),
        createName(),
        createDescription(),
        weight || createWeight());
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

import { Identifiable } from '../domain/Identifiable';

export function validateIsNotEmpty(val?: string | null | any[], msg = 'Value should be non-empty') {
    if (!val) {
        throw new Error(msg);
    }
    if (val instanceof Array && val.length === 0) {
        throw new Error(msg);
    }
}

export function validateUniqueIds(elems: ReadonlyArray<Identifiable>) {
    const duplicates = elems.map(ff => ff.Id).duplicates();
    if (duplicates.length > 0) {
        throw new Error(`Duplicate ids detected: ${duplicates}`);
    }
}

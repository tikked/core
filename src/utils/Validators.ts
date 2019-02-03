import { Identifiable } from "../domain/Identifiable";

export function validateIsNotEmpty(str: string, msg = 'String should be non-empty') {
    if(!str) {
        throw new Error(msg);
    }
}

export function validateUniqueIds(elems: ReadonlyArray<Identifiable>) {
    const duplicates = elems.map(ff => ff.Id).duplicates();
    if(duplicates.length > 0) {
        throw new Error(`Duplicate ids detected: ${duplicates}`);
    }
}
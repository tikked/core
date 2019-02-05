import { Attribute } from './Attribute';
import { validateUniqueIds } from '../utils/Validators';
import '../utils/ArrayExtensions';

export class ContextSchema {
    constructor(private attributes: Attribute[]) {
        validateUniqueIds(attributes);
        this.validateUniqueWeights(attributes);
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
}

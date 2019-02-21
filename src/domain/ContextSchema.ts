import { Attribute } from './Attribute';
import { validateUniqueIds } from '../utils/Validators';
import '../utils/ArrayExtensions';
import { Context } from './Context';
import { Toggle } from './Toggle';
import { cursorTo } from 'readline';

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
                (accu, curr) => ({ ...accu, [curr]: context.get(curr) }),
                <{ [key: string]: string }>{}));
    }

    private validateContext(context: Context): void {
        const attrIdSet = new Set(this.Attributes.map(attr => attr.Id));
        const unknownAttrs = new Set(context.Keys.filter(contKey => !attrIdSet.has(contKey)));
        if (unknownAttrs.size > 0) {
            throw new Error(`Unknown attributes ${[...unknownAttrs].join(', ')}`);
        }
    }

    private weigh(toggle: Toggle): WeightedToggle {
        const weight = this.Attributes
            .map(attr => toggle.Context.hasKey(attr.Id) ? attr.Weight : 0)
            .reduce((acc, cur) => acc + 1 << cur, 0);
        return new WeightedToggle(weight, toggle);
    }

    /**
     * Finds the most relevant toggle based on their keys and the weight of the attributes in
     * this schema
     * @param toggles The pool of toggles to find the most relevant from
     * @throws {Error} If any input toggle has attributes unknown to this schema.
     * Call {@link SchemaContext#filterContext} on this schema before to filter out the unwanted
     * attributes
     * @throws {Error} If two toggles are equally relevant, i.e. have the same attributes
     */
    public getMostRelevant(toggles: Toggle[]): Toggle {
        toggles.map(tog => tog.Context).forEach(this.validateContext.bind(this));
        const weightedToggles = toggles.map(tog => this.weigh(tog));
        weightedToggles.forEach(weightedToggle => {
            const other = weightedToggles.find(other => other.Weight === weightedToggle.Weight);
            if (other !== weightedToggle) {
                throw new Error('Two toggles have the same weight');
            }
        });
        return weightedToggles.max(weightedToggle => weightedToggle.Weight).Toogle;
    }
}

class WeightedToggle {
    constructor(private weight: number, private toggle: Toggle) { }

    public get Weight() {
        return this.weight;
    }

    public get Toogle() {
        return this.toggle;
    }
}

import { Identifiable } from './Identifiable';
import { Toggle } from './Toggle';
import { validateIsNotEmpty } from '../utils/Validators';
import { Context } from './Context';

export class FeatureFlag implements Identifiable {

    private toggles: Toggle[];

    constructor(
        private id: string,
        private name: string,
        private description: string,
        toggles: Toggle[]) {
            validateIsNotEmpty(id, 'Id should be non-empty');
            this.validateToggles(toggles);

            this.toggles = [...toggles];
    }

    private validateToggles(toggles: Toggle[]) {
        validateIsNotEmpty(toggles, 'Toggles should be non-empty');
        if (toggles.every(tog => tog.Context.Keys.length > 0)) {
            throw new Error('Feature flag must have a toggle with an empty context');
        }
    }

    get Id() {
        return this.id;
    }

    get Name() {
        return this.name;
    }

    get Description() {
        return this.description;
    }

    get Toggles() {
        return this.toggles;
    }

    /**
     * Gets the toggles that match with the procided context
     * @param context The context for which to fetch toggles
     */
    public getToggles(context: Context) {
        return this.toggles.filter(tog => tog.matches(context));
    }
}

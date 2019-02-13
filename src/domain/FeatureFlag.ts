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

            this.toggles = [...toggles];
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

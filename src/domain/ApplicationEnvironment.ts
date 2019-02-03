import { ContextSchema } from "./ContextSchema";
import { FeatureFlag } from "./FeatureFlag";
import '../utils/ArrayExtensions';
import { validateIsNotEmpty, validateUniqueIds } from "../utils/Validators";
import { Identifiable } from "./Identifiable";

export class ApplicationEnvironment implements Identifiable {

    constructor(
        private id: string,
        private name: string,
        private description: string,
        private contextSchema: ContextSchema,
        private featureFlags: FeatureFlag[]) {
            validateUniqueIds(featureFlags);
            validateIsNotEmpty(id, 'Id should be non-empty');
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

    get ContextSchema() {
        return this.contextSchema;
    }

    get FeatureFlags(): ReadonlyArray<FeatureFlag> {
        return this.featureFlags;
    }
}

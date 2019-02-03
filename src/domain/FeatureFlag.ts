import { Identifiable } from "./Identifiable";

export class FeatureFlag implements Identifiable {
    constructor(
        private id: string,
        private name: string,
        private description: string) {
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
}
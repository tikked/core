import { Identifiable } from './Identifiable';

export class Attribute implements Identifiable {
    constructor(
        private id: string,
        private name: string,
        private description: string,
        private weight: number) {
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

    get Weight() {
        return this.weight;
    }
}

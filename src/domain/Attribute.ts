import { AttributeType } from './AttributeType';
import { Identifiable } from './Identifiable';

export class Attribute implements Identifiable {
    constructor(
        private id: string,
        private name: string,
        private description: string,
        private type: AttributeType,
        private priority: number) {
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

    get Type() {
        return this.type;
    }

    get Priority() {
        return this.priority;
    }
}
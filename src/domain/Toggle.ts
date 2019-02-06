import { Context } from './Context';

export class Toggle {
    constructor(
        private isActive: boolean,
        private context: Context
    ) {}

    public get IsActive() {
        return this.isActive;
    }

    public matches(context: Context): boolean {
        return this.context.Keys.every(key => this.context.get(key) === context.get(key));
    }
}
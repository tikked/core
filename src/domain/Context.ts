import { ContextSchema } from './ContextSchema';

export class Context {

    constructor(
        private contextData: object
    ) {
        throw new Error('Not implemented!');
    }

    public get(key: string): string {
        throw new Error('Not implemented!');
    }
}

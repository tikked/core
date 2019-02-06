import { ContextSchema } from './ContextSchema';

export class Context {

    private contextData: {[key: string]: string};

    constructor(
        contextData: {[key: string]: string}
    ) {
        this.contextData = {...contextData};
    }

    public get(key: string): string {
        return this.contextData[key];
    }

    public get Keys(): ReadonlyArray<string> {
        return Object.keys(this.contextData);
    }
}

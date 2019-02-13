export class Context {

    private contextData: {[key: string]: string};

    constructor(
        contextData: {[key: string]: string}
    ) {
        this.contextData = {...contextData};
    }

    public get(key: string): string {
        if (!this.hasKey(key)) {
            throw new Error(`Key ${key} not found`);
        }
        return this.contextData[key];
    }

    public hasKey(key: string): boolean {
        return this.contextData.hasOwnProperty(key);
    }

    public get Keys(): ReadonlyArray<string> {
        return Object.keys(this.contextData);
    }
}

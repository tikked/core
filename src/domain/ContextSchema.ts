import { Attribute } from "./Attribute";
import { validateUniqueIds } from "../utils/Validators";

export class ContextSchema {
    constructor(private attributes: Attribute[]){
        validateUniqueIds(attributes);
    }

    get Attributes(): ReadonlyArray<Attribute> {
        return this.attributes;
    }
}
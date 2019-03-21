import * as commandLineArgs from 'command-line-args';
import { Context } from './src/domain';

const contextCreator = (input: string) => new Context(JSON.parse(input));

export function parseCli() {
    const optionDefinitions = [
        { name: 'application-environment', alias: 'a', type: String },
        { name: 'context', alias: 'c', type: contextCreator, multiple: true, defaultOption: true },
        { name: 'root', alias: 'r', type: String }
    ];

    return commandLineArgs(optionDefinitions);
}

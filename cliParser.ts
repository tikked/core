import * as commandLineArgs from 'command-line-args';
import * as commandLineUsage from 'command-line-usage';
import { Context } from './src/domain';

const contextJson = (input: string) => new Context(JSON.parse(input));
const optionDefinitions = [
    {
        name: 'application-environment',
        alias: 'a',
        type: String,
        description: 'Name of the application environment to load. There must be a file named <application-environment>.json in the <root> folder'
    }, {
        name: 'context',
        alias: 'c',
        type: contextJson,
        multiple: true,
        defaultOption: true,
        description: 'The context(s), in form of JSON object(s), which you want to test the feature flags of'
    }, {
        name: 'root',
        alias: 'r',
        type: String,
        description: 'The root folder to search for the application environment'
    }, {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Shows this help text'
    }
];

export function parseCliArgs() {
    return commandLineArgs(optionDefinitions);
}

export function showCliHelp() {
    console.log(commandLineUsage([
        {
            header: 'GQ',
            content: 'A feature flag thingy'
        }, {
            header: 'Synopsis',
            content: [
                `$ gq --root {underline folder} --application-environment {underline string} [--context] {underline contextjson} ...`,
                '$ gq --help'
            ]
        }, {
            header: 'Options',
            optionList: optionDefinitions
        }
    ]))
}

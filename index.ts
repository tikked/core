import * as commandLineArgs from 'command-line-args';
import { Container } from 'inversify';
import 'reflect-metadata';
import { Context } from './src/domain';
import { ApplicationEnvironmentRepository, Coder, StreamFactory } from './src/persistency';
import { FileStreamFactory } from './src/persistency/FileStreamFactory';
import { JsonCoder } from './src/persistency/JsonCoder';
import { TYPES } from './types';

const container = new Container();
container.bind<ApplicationEnvironmentRepository>(ApplicationEnvironmentRepository).toSelf();
container.bind<StreamFactory>(TYPES.StreamFactory).to(FileStreamFactory);
container.bind<Coder>(TYPES.Coder).to(JsonCoder);
const repo = container.get<ApplicationEnvironmentRepository>(ApplicationEnvironmentRepository);

const optionDefinitions = [
    { name: 'application-environment', alias: 'a', type: String },
    { name: 'context', alias: 'c', type: input => new Context(JSON.parse(input)), multiple: true, defaultOption: true }
];

const options = commandLineArgs(optionDefinitions);

repo.get(options['application-environment']).subscribe({next: appEnv => {
    options.context.forEach(element => {
        const featureSet = appEnv.getFeatureSet(element);
        console.log(element, featureSet);
    });
}});

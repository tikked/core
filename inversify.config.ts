import { Container } from 'inversify';
import { ApplicationEnvironmentRepository, Coder, StreamFactory } from './src/persistency';
import { FileStreamFactory } from './src/persistency/FileStreamFactory';
import { JsonCoder } from './src/persistency/JsonCoder';
import { TYPES } from './types';

export function createContainer(applicationEnvironmentRoot: string): Container {
    const container = new Container();
    container.bind<ApplicationEnvironmentRepository>(ApplicationEnvironmentRepository)
        .toSelf().inSingletonScope();
    container.bind<StreamFactory>(TYPES.StreamFactory).to(FileStreamFactory);
    container.bind<Coder>(TYPES.Coder).to(JsonCoder);
    container.bind<string>(TYPES.ApplicationEnvironmentRoot)
        .toConstantValue(applicationEnvironmentRoot);
    return container;
}

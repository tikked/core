import { Container } from 'inversify';
import { ApplicationEnvironmentRepository, Coder, StreamFactory } from './src/persistency';
import { FileStreamFactory } from './src/persistency/FileStreamFactory';
import { JsonCoder } from './src/persistency/JsonCoder';
import { TYPES } from './types';

const container = new Container();
container.bind<ApplicationEnvironmentRepository>(ApplicationEnvironmentRepository).toSelf();
container.bind<StreamFactory>(TYPES.StreamFactory).to(FileStreamFactory);
container.bind<Coder>(TYPES.Coder).to(JsonCoder);

export { container };

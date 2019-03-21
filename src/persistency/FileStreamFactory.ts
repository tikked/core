import { injectable } from 'inversify';
import { StreamFactory } from '.';
import { FileStream } from './FileStream';

@injectable()
export class FileStreamFactory implements StreamFactory<FileStream> {
    public create(applicationEnvironmentName: string): FileStream {
        return new FileStream(`${applicationEnvironmentName}.json`);
    }
}

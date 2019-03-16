import { StreamFactory } from '.';
import { FileStream } from './FileStream';

export class FileStreamFactory implements StreamFactory<FileStream> {
    public create(applicationEnvironmentName: string): FileStream {
        return new FileStream(applicationEnvironmentName);
    }
}

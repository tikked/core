import { inject, injectable } from 'inversify';
import { StreamFactory } from '.';
import { TYPES } from '../../types';
import { FileStream } from './FileStream';

@injectable()
export class FileStreamFactory implements StreamFactory<FileStream> {

    constructor(@inject(TYPES.ApplicationEnvironmentRoot) private root = '') {}

    public create(applicationEnvironmentName: string): FileStream {
        return new FileStream(`${this.root}${applicationEnvironmentName}.json`);
    }
}

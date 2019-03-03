import { Decoder, Loader } from '.';
import { ApplicationEnvironment } from '../domain/ApplicationEnvironment';
import { promises as fsPromises } from 'fs';

export class FileLoader implements Loader {
    private decoders: Map<string, Decoder<string>>;
    private files: string[];
    private loader: (filePath: string) => Promise<string>;

    constructor() {
        this.decoders = new Map<string, Decoder<string>>();
        this.files = [];
        this.loader = filePath => fsPromises.readFile(filePath, 'utf8');
    }

    setDecoder(fileExtension: string, decoder: Decoder<string>): FileLoader {
        this.decoders.set(fileExtension, decoder);
        return this;
    }

    addFile(filePath: string): FileLoader {
        this.files.push(filePath);
        return this;
    }

    async load(): Promise<ApplicationEnvironment[]> {
        return Promise.all(
            this.files.map(async file => {
                const fileType = file.substr(file.lastIndexOf('.') + 1);
                const decoder = this.decoders.get(fileType);
                if (!decoder) {
                    throw new Error(`No decoder found for file of type ${fileType}`);
                }
                const data = await this.loader(file);
                return decoder.decode(data);
            })
        );
    }
}

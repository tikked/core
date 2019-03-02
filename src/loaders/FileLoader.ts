import { Loader } from '.';
import { ApplicationEnvironment } from '../domain/ApplicationEnvironment';
import { Mapper } from '../mappers';
import { read, readFile } from 'fs';

export class FileLoader implements Loader {
    private mappers: Map<string, Mapper<string>>;
    private files: string[];
    private loader: (filePath: string) => Promise<string>;

    constructor() {
        this.mappers = new Map<string, Mapper<string>>();
        this.files = [];
        this.loader = filePath => {
            return new Promise((resolve, reject) => {
                readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(data);
                });
            });
        };
    }

    setMapper(fileExtension: string, mapper: Mapper<string>): FileLoader {
        this.mappers.set(fileExtension, mapper);
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
                const mapper = this.mappers.get(fileType);
                if (!mapper) {
                    throw new Error(`No mapper found for file of type ${fileType}`);
                }
                const data = await this.loader(file);
                return mapper.map(data);
            })
        );
    }
}

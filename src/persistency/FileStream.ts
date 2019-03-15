import { promises as fsPromises, watch as fsWatch } from 'fs';
import { Observable } from 'rxjs';
import { DataStream } from '.';
import { validateIsNotEmpty } from '../utility/Validators';

export class FileStream implements DataStream {

    constructor(
        private filePath: string,
        private load =
            (fp: string) => fsPromises.readFile(fp, 'utf8'),
        private watch =
            (fp: string, watcher: (event: string) => void) => fsWatch(fp, 'utf8', watcher),
        private _write =
            (fp: string, content: string) => fsPromises.writeFile(fp, content, 'utf8')) {
        validateIsNotEmpty(filePath);
    }

    public write(content: string): Promise<void> {
        return this._write(this.filePath, content);
    }

    public read(): Observable<string> {
        return new Observable<string>(observer => {
            this.load(this.filePath)
            .then(observer.next.bind(observer))
            .then(() => {
                this.watch(this.filePath, event =>
                    this.load(this.filePath).then(
                        event === 'change'
                            ? observer.next.bind(observer) :
                        event === 'close'
                            ? observer.complete.bind(observer) :
                        observer.error.bind(observer)));
            });
        });
    }
}

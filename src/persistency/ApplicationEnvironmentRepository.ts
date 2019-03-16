import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Coder, DataStream, StreamFactory } from '.';
import { ApplicationEnvironment } from '../domain';

export class ApplicationEnvironmentRepository {

    private streams: Map<string, DataStream>;

    constructor(
        private streamFactory: StreamFactory,
        private coder: Coder<string>) {
        this.streams = new Map<string, DataStream>();
    }

    public get(id: string): Observable<ApplicationEnvironment> {
        if (!this.streams.has(id)) {
            const stream = this.streamFactory.create(id);
            this.streams.set(id, stream);
        }
        const res = this.streams.get(id);
        if (!res) {
            throw new Error(`Unknown id: ${id}`);
        }
        return res.read().pipe(map(x => this.coder.decode(x)));
    }
}

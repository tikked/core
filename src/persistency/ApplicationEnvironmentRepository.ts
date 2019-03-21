import { inject, injectable } from 'inversify';
import { Observable, throwError } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Coder, DataStream, StreamFactory } from '.';
import { TYPES } from '../../types';
import { ApplicationEnvironment } from '../domain';

@injectable()
export class ApplicationEnvironmentRepository {

    private streams: Map<string, DataStream>;

    constructor(
        @inject(TYPES.StreamFactory) private streamFactory: StreamFactory,
        @inject(TYPES.Coder) private coder: Coder) {
        this.streams = new Map<string, DataStream>();
    }

    public get(id: string): Observable<ApplicationEnvironment> {
        if (!this.streams.has(id)) {
            try {
                const stream = this.streamFactory.create(id);
                this.streams.set(id, stream);
            } catch (err) {
                return throwError(err);
            }
        }
        const res = this.streams.get(id);
        if (!res) {
            throw new Error(`Unknown id: ${id}`);
        }
        return res.read().pipe(
            map(x => {
                try {
                    return this.coder.decode(x);
                } catch (e) {
                    console.error(e);
                    return undefined;
                }
            }),
            filter<ApplicationEnvironment>(x => x !== undefined)
        );
    }
}

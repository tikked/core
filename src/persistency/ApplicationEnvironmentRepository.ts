import { inject, injectable } from 'inversify';
import { Observable, throwError } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Coder, DataStream, StreamFactory } from '.';
import { TYPES } from '../../types';
import { ApplicationEnvironment } from '../domain';

@injectable()
export class ApplicationEnvironmentRepository {

    constructor(
        @inject(TYPES.StreamFactory) private streamFactory: StreamFactory,
        @inject(TYPES.Coder) private coder: Coder) {
    }

    private decodeOrLog(input: string): ApplicationEnvironment | undefined {
        try {
            return this.coder.decode(input);
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    public get(id: string): Observable<ApplicationEnvironment> {
        try {
            return this.streamFactory.create(id).read().pipe(
                map(x => this.decodeOrLog(x)),
                filter<ApplicationEnvironment>(x => x !== undefined));
        } catch (err) {
            return throwError(err);
        }
    }
}

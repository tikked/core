import { Observable } from 'rxjs';
import { ApplicationEnvironment } from '../domain/ApplicationEnvironment';

export interface Encoder<T> {
    encode(appEnv: ApplicationEnvironment): T;
}

export interface Decoder<T> {
    decode(input: T): ApplicationEnvironment;
}

export interface Coder<T> extends Decoder<T>, Encoder<T> {}

/**
 * A stream of data, that can be written and read
 */
export interface DataStream<TData = string> {
    /**
     * Get observable of the data stream, that triggers when the underlying source is updated
     */
    read(): Observable<TData>;
    /**
     * Write data back to the underlying source
     * @param content The data written to the underlying source
     */
    write(content: TData): Promise<void>;
}

export interface StreamFactory<TStream extends DataStream = DataStream> {
    create(applicationEnvironmentName: string): TStream;
}

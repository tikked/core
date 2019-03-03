import { ApplicationEnvironment } from '../domain/ApplicationEnvironment';

export interface Encoder<T> {
    encode(appEnv: ApplicationEnvironment): T;
}

export interface Decoder<T> {
    decode(input: T): ApplicationEnvironment;
}

import { ApplicationEnvironment } from '../domain/ApplicationEnvironment';

export interface Mapper<T> {
    map(input: T): ApplicationEnvironment;
}

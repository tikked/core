import { ApplicationEnvironment } from '../domain/ApplicationEnvironment';

export interface Loader {
    load(): Promise<ApplicationEnvironment[]>;
}

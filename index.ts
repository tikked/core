import 'reflect-metadata';
import { parseCli } from './cliParser';
import { container } from './inversify.config';
import { ApplicationEnvironmentRepository } from './src/persistency';

const repo = container.get<ApplicationEnvironmentRepository>(ApplicationEnvironmentRepository);
const options = parseCli();

repo.get(options['application-environment']).subscribe({next: appEnv => {
    options.context.forEach(element => {
        const featureSet = appEnv.getFeatureSet(element);
        console.log(element, featureSet);
    });
}});

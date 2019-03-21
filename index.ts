import 'reflect-metadata';
import { parseCli } from './cliParser';
import { createContainer } from './inversify.config';
import { ApplicationEnvironmentRepository } from './src/persistency';

const options = parseCli();
const repo = createContainer(options.root)
    .get<ApplicationEnvironmentRepository>(ApplicationEnvironmentRepository);

repo.get(options['application-environment']).subscribe({next: appEnv => {
    options.context.forEach(element => {
        const featureSet = appEnv.getFeatureSet(element);
        console.log(element, featureSet);
    });
}});

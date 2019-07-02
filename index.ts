import 'reflect-metadata';
import { parseCliArgs, showCliHelp } from './cliParser';
import { createContainer } from './inversify.config';
import { ApplicationEnvironmentRepository } from './src/persistency';

const options = parseCliArgs();
if (options.help) {
    showCliHelp();
    process.exit(0);
}
const missingArgs = ['application-environment', 'root', 'context']
    .filter(option => !options[option]);

if (missingArgs.length > 0) {
    console.log(`Missing argument${missingArgs.length > 1 ? 's' : ''}: ${missingArgs.join(', ')}. See usage deatils below.`);
    showCliHelp();
    process.exit(1);
}

const repo = createContainer(options.root)
    .get<ApplicationEnvironmentRepository>(ApplicationEnvironmentRepository);

repo.get(options['application-environment']).subscribe({next: appEnv => {
    options.context.forEach(element => {
        const featureSet = appEnv.getFeatureSet(element);
        console.log(element, featureSet);
    });
}});

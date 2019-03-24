import * as express from 'express';
import { inject } from 'inversify';
import {
    controller,
    httpGet,
    interfaces,
    request,
    requestParam
} from 'inversify-express-utils';
import { ApplicationEnvironment, Context } from '../domain';
import { ApplicationEnvironmentRepository } from '../persistency';
import { skip } from 'rxjs/operators';

@controller('/application-environment')
export class ApplicationEnvironmentController implements interfaces.Controller {

    constructor(
        @inject(ApplicationEnvironmentRepository) private repo: ApplicationEnvironmentRepository) {}

    @httpGet('/:id')
    private index(
        @requestParam('id') id: string): Promise<ApplicationEnvironment> {
            return new Promise<ApplicationEnvironment>((resolve, reject) => {
                this.repo.get(id).subscribe({
                    next: appEnv => resolve(appEnv),
                    error: err => reject(err)
                });
            });
    }

    @httpGet('/:id/feature-set')
    private featureSet(
        @requestParam('id') id: string,
        @request() req: express.Request): Promise<Iterable<string>> {
            const context = new Context(req.query);
            return new Promise<Iterable<string>>((resolve, reject) => {
                const wait = req.query.wait === 'true';
                if (wait) {
                    setTimeout(resolve, 60000);
                }
                this.repo.get(id).pipe(skip(wait ? 1 : 0)).subscribe({
                    next: appEnv => resolve([...appEnv.getFeatureSet(context)]),
                    error: err => reject(err)
                });
            });
    }
}

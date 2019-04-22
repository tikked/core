const start = Date.now();
// Must be imported first
import 'reflect-metadata';
// tslint:disable-next-line: ordered-imports
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { createContainer } from './inversify.config';

// declare metadata by @controller annotation
import './src/controllers/ApplicationEnvironmentController';

const container = createContainer('samples');

// create server
const server = new InversifyExpressServer(container);
server.setConfig(app => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

const application = server.build();
application.listen(3000, () => {
    console.log(`Server started in ${Date.now() - start} millies`);
});

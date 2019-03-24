const start = Date.now();
import 'reflect-metadata';
import * as bodyParser from 'body-parser';
import { InversifyExpressServer } from 'inversify-express-utils';
import { createContainer } from './inversify.config';

// declare metadata by @controller annotation
import './src/controllers/ApplicationEnvironmentController';

let container = createContainer('samples');

// create server
let server = new InversifyExpressServer(container);
server.setConfig((app) => {
  // add body parser
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
});

let app = server.build();
app.listen(3000, () => {
    console.log(`Server started in ${Date.now() - start} millies`);
});

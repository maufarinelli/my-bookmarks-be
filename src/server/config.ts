import { Application } from 'express';
import ENV from '../utils/env';

const configServer = (app: Application) => {
  app.set('port', ENV.PORT);
  app.set('env', ENV.NODE_ENV);
};

export default configServer;

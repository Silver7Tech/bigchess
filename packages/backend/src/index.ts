import debug from 'debug';
import config from './config';
import { start } from './lib/express';

const log = debug('app:main');
(async () => {
  const app = await start();
  app.listen(config.port, config.host, () => {
    log('Environment       : %s', config.env);
    log('MongoDB           : %s', config.dbUrl);
    log('Server Started on : %s', config.publicUrl);
  });
})();

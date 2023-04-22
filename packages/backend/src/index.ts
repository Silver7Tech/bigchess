import debug from 'debug';
import config from './config';
import { start } from './lib/express';
import { get } from './config/tools';

const log = debug('app:main');
(async () => {
  const app = await start();
  app.listen(config.port, config.host, () => {
    log('Environment       : %s', config.env);
    log('MongoDB           : %s', get('DATABASE_URL'));
    log('Server Started on : %s', config.publicUrl);
  });
})();

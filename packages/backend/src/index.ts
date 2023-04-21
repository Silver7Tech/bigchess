import { start } from './lib/express';

(async () => {
  const app = await start();
  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
})();

import debug from 'debug';
import express from 'express';
import morgan from 'morgan';
import * as trpcExpress from '@trpc/server/adapters/express';
import { prismaClient } from './prisma';
import { appRouter } from '~/routers';
import { createContext } from './trpc/context';
const log = debug('app:main');

export async function start() {
  const app = express();

  // configure express public folder
  log('confiugring public folder');
  app.use(express.static('public'));

  log('configuring logging');
  app.use(morgan('tiny'));

  log('configuring body parser');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  log('configuring tRPC');
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );

  await prismaClient.$connect();

  // configure fallback
  log('confiugring fallback');
  app.get('/*', (req, res) => {
    res.status(404).json({
      success: false,
      message: 'API does not exist',
    });
  });

  return app;
}

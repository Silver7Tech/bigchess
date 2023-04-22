import debug from 'debug';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as trpcExpress from '@trpc/server/adapters/express';
import config from '~/config/index';
import { prismaClient } from './prisma';
import { appRouter } from '~/routers';
import { createContext } from './trpc/context';
import { expressHandler } from 'trpc-playground/handlers/express';
const log = debug('app:main');

export async function start() {
  const app = express();

  app.set('view engine', 'html');

  if (config.cors.enabled) {
    log('cors enabled');
    app.use(cors(config.cors.options));
  }
  if (config.morgan.enabled) {
    log('configuring logging');
    app.use(morgan('tiny'));
  }
  // configure express public folder
  log('confiugring public folder');
  app.use(express.static('public'));

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

  if (config.trpc.playground.enabled) {
    log('enabling tRPC playground');
    app.use(
      `${config.prefix}/trpc-playground`,
      await expressHandler({
        trpcApiEndpoint: `${config.prefix}/trpc`,
        playgroundEndpoint: `${config.prefix}/trpc-playground`,
        router: appRouter,
      }),
    );
  }

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

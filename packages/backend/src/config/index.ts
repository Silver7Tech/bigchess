import { readFileSync } from 'node:fs';
import { CorsOptionsDelegate } from 'cors';

import { get } from './tools';
import { Request } from 'express';

const jwtCerts = (
  [
    {
      name: 'Public Key',
      key: 'publicKey',
      envVar: 'JWT_PUBLIC_KEY',
    },
    {
      name: 'Private Key',
      key: 'privateKey',
      envVar: 'JWT_PRIVATE_KEY',
    },
  ] as {
    name: string;
    key: string;
    envVar: 'JWT_PRIVATE_KEY' | 'JWT_PUBLIC_KEY';
  }[]
).reduce((prev, curr) => {
  const path = get(curr.envVar);

  if (path.startsWith('-----BEGIN')) {
    return { ...prev, [curr.key]: path };
  }

  try {
    const content = readFileSync(path, { encoding: 'utf-8' });
    return { ...prev, [curr.key]: content };
  } catch (e) {
    console.warn('Cannot find the "%s". please check the "%s" file', curr.name, path);
  }

  return prev;
}, {});

const publicUrl = get('PUBLIC_URL');

export default {
  env: get('NODE_ENV'),
  mediaStrictMode: get('MEDIA_STRICT_MODE'),
  port: get('PORT'),
  prefix: get('API_PREFIX'),
  host: get('HOST'),
  appName: get('APP_NAME'),
  publicUrl,
  domain: new URL(publicUrl).host,
  morgan: {
    enabled: get('MORGAN_ENABLED'),
    type: get('MORGAN_TYPE'),
  },
  cors: {
    enabled: get('CORS_ENABLED'),
    options(req: Request, done) {
      const value = get('CORS_ORIGIN');
      const origin = req.get('origin');

      if (value === '*') return done(null, { origin: '*' });

      if (!origin) return done(null, { origin: false });

      const whitelist: string[] = value.split(',');
      const found = whitelist.find((o) => origin.startsWith(o));
      return done(null, { origin: !!found });
    },
  } as {
    enabled: boolean;
    options: CorsOptionsDelegate;
  },
  auth0: {
    clientId: get('AUTH0_CLIENT_ID'),
    clientSecret: get('AUTH0_CLIENT_SECRET'),
    domain: get('AUTH0_DOMAIN'),
  },
  security: {
    code: {
      delay: get('SECURITY_DELAY'),
      maxTries: get('SECURITY_MAX_TRIES'),
    },
  },
  dbUrl: get('DATABASE_URL'),
  trpc: {
    playground: {
      enabled: get('TRPC_PLAYGROUND_ENABLED'),
    },
  },
  sendGrid: {
    apiKey: get('SENDGRID_API_KEY'),
    from: get('SENDGRID_FROM'),
  },
  jwt: {
    publicKey: '',
    privateKey: '',
    ...jwtCerts,
    aud: get('JWT_AUDIENCE')?.split(','),
    iss: get('JWT_ISSUER'),
    exp: get('JWT_EXPIRATION'),
  },
  spaces: {
    domain: get('SPACES_STATIC_DOMAIN'),
    endpoint: get('SPACES_ENDPOINT'),
    chunkSize: get('SPACES_CHUNK_SIZE'),
    bucket: get('SPACES_BUCKET'),
    region: get('SPACES_REGION'),
    credentials: {
      accessKeyId: get('SPACES_CLIENT_ID'),
      secretAccessKey: get('SPACES_SECRET_KEY'),
    },
  },
};

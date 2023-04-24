import { EnvKeys } from './interfaces';

export type VariableValue = string | boolean | number;

export type GVariable<T extends VariableValue> = {
  defaultValue?: T;
  group?: string;
  log?: boolean;
  description?: string;
  name: string;
};

export type StringVariable = GVariable<string> & {
  type: 'string';
};

export type BooleanVariable = GVariable<boolean> & {
  type: 'boolean';
};

export type NumberVariable = GVariable<number> & {
  type: 'number';
};

export type Variable = StringVariable | BooleanVariable | NumberVariable;

const ENV = process.env.NODE_ENV || 'local';

const variables: Record<EnvKeys, Variable> = {
  NODE_ENV: {
    name: 'Env Type',
    type: 'string',
    defaultValue: 'local',
  },
  MEDIA_STRICT_MODE: {
    name: 'Strict Mode',
    group: 'app',
    type: 'boolean',
    defaultValue: true,
  },
  /**
   * App
   */
  PORT: {
    name: 'Port',
    type: 'number',
    defaultValue: 3000,
  },
  API_PREFIX: {
    name: 'API Prefix',
    type: 'string',
    defaultValue: '',
  },
  PUBLIC_URL: {
    type: 'string',
    name: 'Public URL',
    defaultValue: `http://localhost:${process.env.PORT || 3000}`,
  },
  HOST: {
    type: 'string',
    name: 'Host',
    defaultValue: '0.0.0.0',
  },
  APP_NAME: {
    type: 'string',
    name: 'App Name',
    defaultValue: 'GameStop Launcher',
  },
  CORS_ORIGIN: {
    type: 'string',
    name: 'Origin',
    group: 'CORS',
    defaultValue: 'https://gamestoplauncher.io,https://dev.gamestoplauncher.io,',
  },
  CORS_ENABLED: {
    name: 'Enabled',
    group: 'CORS',
    defaultValue: false,
    type: 'boolean',
  },
  MORGAN_ENABLED: {
    name: 'Enable logging',
    group: 'morgan',
    defaultValue: false,
    type: 'boolean',
  },
  MORGAN_TYPE: {
    type: 'string',
    name: 'Type',
    group: 'morgan',
    defaultValue: 'dev',
  },
  /**
   * SendGrid
   */
  SENDGRID_API_KEY: {
    type: 'string',
    name: 'SendGrid API Key',
    group: 'Mailer',
  },
  SENDGRID_FROM: {
    type: 'string',
    name: 'From',
    group: 'Mailer',
    defaultValue: 'noreply@paramlabs.io',
  },
  /**
   * Auth
   */
  AUTH0_CLIENT_ID: {
    type: 'string',
    group: 'Auth0',
    name: 'Client ID',
    defaultValue: 'AUTH0_CLIENT_ID',
  },
  AUTH0_CLIENT_SECRET: {
    type: 'string',
    group: 'Auth0',
    name: 'Client Secret',
    defaultValue: 'AUTH0_CLIENT_SECRET',
  },
  AUTH0_DOMAIN: {
    type: 'string',
    group: 'Auth0',
    name: 'Client ID',
    defaultValue: 'gamestop-launcher.us.auth0.com',
  },
  /**
   * Security
   */
  SECURITY_DELAY: {
    name: 'Delay',
    group: 'security',
    type: 'number',
    defaultValue: 30000,
  },
  SECURITY_MAX_TRIES: {
    name: 'Max Tries',
    group: 'security',
    type: 'number',
    defaultValue: 5,
  },
  /**
   * Spaces
   */
  SPACES_REGION: {
    type: 'string',
    name: 'Region',
    group: 'aws:spaces',
    defaultValue: 'fra1',
  },
  SPACES_ENDPOINT: {
    type: 'string',
    name: 'Endpoint',
    group: 'aws:spaces',
    defaultValue: 'https://fra1.digitaloceanspaces.com',
  },
  SPACES_STATIC_DOMAIN: {
    type: 'string',
    name: 'Static Domain',
    group: 'aws:spaces',
    defaultValue: 'static.gamestoplauncher.io',
  },
  SPACES_BUCKET: {
    type: 'string',
    name: 'Bucket',
    group: 'aws:spaces',
    defaultValue: 'launcher',
  },
  SPACES_CHUNK_SIZE: {
    type: 'number',
    name: 'Chunk size',
    group: 'aws:spaces',
    defaultValue: 100_000_000,
  },
  SPACES_CLIENT_ID: {
    type: 'string',
    name: 'Client ID',
    group: 'aws:spaces',
    defaultValue: 'SPACES_CLIENT_ID',
  },
  SPACES_SECRET_KEY: {
    type: 'string',
    name: 'Secret Key',
    group: 'aws:spaces',
    defaultValue: 'SPACES_SECRET_KEY',
  },
  /**
   * MongoDB
   */
  DATABASE_URL: {
    type: 'string',
    name: 'URI',
    group: 'MongoDB',
    defaultValue: `mongodb://127.0.0.1:27017/app-${ENV}`,
  },
  /**
   * tRPC
   */
  TRPC_PLAYGROUND_ENABLED: {
    type: 'boolean',
    name: 'Enable',
    group: 'tRPC',
    defaultValue: false,
  },
  /**
   * JWT
   */
  JWT_ISSUER: {
    type: 'string',
    name: 'Issuer',
    log: false,
    group: 'JWT',
    defaultValue: 'https://api.gamestoplauncher.io',
  },
  JWT_AUDIENCE: {
    type: 'string',
    name: 'Audience',
    log: false,
    group: 'JWT',
    defaultValue: 'api.gamestoplauncher.io',
  },
  JWT_EXPIRATION: {
    name: 'Expiration',
    log: false,
    group: 'JWT',
    defaultValue: 2592000, // 30 days
    type: 'number',
  },
  JWT_PUBLIC_KEY: {
    type: 'string',
    name: 'Private Key',
    log: false,
    group: 'JWT',
    defaultValue: 'certs/es512-public.pem',
  },
  JWT_PRIVATE_KEY: {
    type: 'string',
    name: 'Private Key',
    log: false,
    group: 'JWT',
    defaultValue: 'certs/es512-private.pem',
  },
} as const;

export default variables;

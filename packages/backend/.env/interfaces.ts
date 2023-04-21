export type EnvVariables = Partial<{
  PORT: string;
  HOST: string;
  NODE_ENV: string;

  API_PREFIX: string;
  PUBLIC_URL: string;
  DATABASE_URL: string;

  CORS_ORIGIN: string;
  CORS_ENABLED: boolean;

  MORGAN_ENABLED: boolean;
}>;

import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { Session } from '@prisma/client';
type TRPCContext = Partial<{
  session: Session;
  token: string;
}>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function createContext(_options: CreateExpressContextOptions) {
  return {} as TRPCContext;
}

export type Context = inferAsyncReturnType<typeof createContext>;

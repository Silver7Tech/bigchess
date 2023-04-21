import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';

const t = initTRPC.meta<{ allowed?: [] }>().context<Context>().create();
export const middlware = t.middleware;
export const router = t.router;

export const checkPermissions = middlware(({ ctx, meta, next }) => {
  const allowed = meta?.allowed;

  if (!allowed) return next({ ctx });

  if (allowed.length === 0) return next({ ctx });

  throw new TRPCError({
    code: 'FORBIDDEN',
    message: 'You do not have permission to access this resource',
  });
});

export const publicProcedure = t.procedure.use(checkPermissions);

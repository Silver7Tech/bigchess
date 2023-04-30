import { httpLink, createTRPCUntypedClient } from "@trpc/client";
export const apiPrefix = import.meta.env.VITE_API_PREFIX || "/api/v1";

const trpcLink = httpLink({
  url: `${apiPrefix}/trpc`,
  headers() {
    const token = localStorage.getItem("token");

    // if (window.location.pathname === '/login') {
    //   token = null
    // }

    return token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};
  },
});

export const trpc = createTRPCUntypedClient({
  links: [trpcLink],
});

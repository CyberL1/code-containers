import type { RouteMethods } from "#src/types/Route.ts";

export const methods: RouteMethods = {
  get: () => {
    return { appName: "code-containers" };
  },
};

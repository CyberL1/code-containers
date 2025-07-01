import type { FastifyReply, FastifyRequest, RouteOptions } from "fastify";

type RouteHTTPMethods = "get" | "post" | "put" | "delete" | "patch";

export type RouteMethods = {
  [key in RouteHTTPMethods]?:
    | Omit<RouteOptions, "method" | "url">
    | ((req: FastifyRequest, reply: FastifyReply) => void);
};

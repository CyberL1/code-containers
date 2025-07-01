import type { Container } from "#src/types/Container.ts";
import { getContainer } from "#src/utils/containers.ts";
import type { FastifyRequest } from "fastify";

export const methods = {
  get: async (req: FastifyRequest<{ Params: Container }>) => {
    const container = getContainer(req.params.id);
    const { Processes } = await container.top();

    return Processes;
  },
};

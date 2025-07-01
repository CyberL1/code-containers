import type { Container } from "#src/types/Container.ts";
import { getContainer, getContainerResponse } from "#src/utils/containers.ts";
import type { FastifyRequest } from "fastify";

export const methods = {
  put: async (req: FastifyRequest<{ Params: Container }>) => {
    const container = getContainer(req.params.id);

    await container.restart();
    return getContainerResponse(container);
  },
};

import type { FastifyRequest } from "fastify";
import type { Container } from "#src/types/Container.ts";
import { getContainer, getContainerResponse } from "#src/utils/containers.ts";

export const methods = {
  put: async (req: FastifyRequest<{ Params: Container }>) => {
    const container = getContainer(req.params.id);

    await container.stop();
    return getContainerResponse(container);
  },
};

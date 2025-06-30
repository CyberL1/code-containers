import type {
  Container,
  RemoveContainerParams,
  RemoveContainerQuery,
} from "#src/types/Container.ts";
import { getContainer, getContainerResponse } from "#src/utils/containers.ts";
import type { FastifyRequest } from "fastify";

export const methods = {
  get: (req: FastifyRequest<{ Params: Container }>) => {
    const container = getContainer(req.params.id);
    return getContainerResponse(container);
  },

  delete: async (
    req: FastifyRequest<{
      Params: RemoveContainerParams;
      Querystring: RemoveContainerQuery;
    }>,
    reply,
  ) => {
    const container = getContainer(req.params.id);

    await container.remove({ force: req.query.force === "true" });
    reply.code(204);
  },
};

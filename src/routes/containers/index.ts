import createContainerSchema from "#src/schemas/createContainerSchema.ts";
import type { CreateContainerBody, Container } from "#src/types/Container.ts";
import type { RouteMethods } from "#src/types/Route.ts";
import {
  createContainer,
  getContainerResponse,
  getContainers,
} from "#src/utils/containers.ts";
import type { FastifyRequest } from "fastify";

export const methods: RouteMethods = {
  get: async () => {
    const containers = await getContainers();
    const containersResponse = [];

    for (const container of containers) {
      const response = {
        id: container.Id,
        name: container.Names[0].slice(1),
        image: container.Image,
        status: container.State,
      } as Container;

      containersResponse.push(response);
    }

    return containersResponse;
  },

  post: {
    schema: createContainerSchema,
    handler: async (req: FastifyRequest<{ Body: CreateContainerBody }>) => {
      const container = await createContainer({
        name: req.body.name,
        image: req.body.image,
      });

      await container.start();
      return getContainerResponse(container);
    },
  },
};

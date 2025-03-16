import type {
  CreateContainerBody,
  RemoveContainerParams,
  RemoveContainerQuery,
} from "#src/types/Container.ts";
import {
  createContainer,
  getContainer,
  getContainerResponse,
} from "#src/utils/containers.ts";
import { getImage } from "#src/utils/images.ts";
import type { FastifyRequest } from "fastify";

export const methods = {
  post: async (
    req: FastifyRequest<{
      Params: RemoveContainerParams;
      Querystring: RemoveContainerQuery;
      Body: CreateContainerBody;
    }>,
  ) => {
    if (req.body) {
      if (!(await getImage(req.body?.image).inspect()).Id) {
        return;
      }
    }

    const oldContainer = getContainer(req.params.id);
    const name = (await oldContainer.inspect()).Name;

    const image =
      req.body?.image ||
      (await oldContainer.inspect()).Config.Labels["code-containers.image"];

    await oldContainer.remove({ force: req.query.force === "true" });

    const newContainer = await createContainer({ name, image });
    await newContainer.start();

    return getContainerResponse(newContainer);
  },
};

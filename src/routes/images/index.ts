import { getImages } from "#src/utils/images.ts";
import type { FastifyInstance, } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.get("/", async () => {
    const images = [];

    for (const image of await getImages()) {
      images.push(image.RepoTags[0]);
    }

    return images;
  });
};

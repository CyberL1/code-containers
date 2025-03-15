import { getImages } from "#src/utils/images.ts";
import type { FastifyInstance } from "fastify";

export default (fastify: FastifyInstance) => {
  fastify.get("/", () => {
    return getImages();
  });
};

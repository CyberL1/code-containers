import type { Image } from "#src/types/Image.ts";
import { getImage } from "#src/utils/images.ts";
import type { FastifyRequest } from "fastify";

export const methods = {
  get: (req: FastifyRequest<{ Params: Image }>) => {
    const image = getImage(req.params.name);
    return image.inspect();
  },
};

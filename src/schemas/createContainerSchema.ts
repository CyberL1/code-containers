import type { FastifySchema } from "fastify";

const createContainerSchema: FastifySchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string", minLength: 2, maxLength: 63 },
      image: { type: "string", minLength: 1 },
    },
    required: ["name", "image"],
  },
};

export default createContainerSchema;

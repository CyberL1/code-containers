import type { FastifyRequest } from "fastify";
import type { Container } from "#src/types/Container.ts";
import { getContainer } from "#src/utils/containers.ts";

export const methods = {
  get: async (req: FastifyRequest<{ Params: Container }>, reply) => {
    const container = getContainer(req.params.id);

    reply.header("Content-Type", "text/event-stream");
    reply.header("Cache-Control", "no-cache");
    reply.header("Connection", "keep-alive");

    const stream = await container.stats({ stream: true });

    if (!stream) {
      reply.status(500).send("Error fetching stats");
      return;
    }
    stream.on("data", (chunk) => {
      reply.raw.write(`data: ${chunk.toString()}\n\n`);
    });

    stream.on("end", () => reply.raw.end());
    return stream;
  },
};

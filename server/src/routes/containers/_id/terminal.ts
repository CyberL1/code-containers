import type { FastifyRequest } from "fastify";
import { PassThrough } from "stream";
import type { Container } from "#src/types/Container.ts";
import { getContainer } from "#src/utils/containers.ts";

export const options = { get: { webscket: true } };

export const methods = {
  get: async (connection, req: FastifyRequest<{ Params: Container }>) => {
    const container = getContainer(req.params.id);

    const exec = await container.exec({
      Cmd: ["/bin/bash"],
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
    });

    const stream = await exec.start({ hijack: true, stdin: true });

    const stdout = new PassThrough();
    const stderr = new PassThrough();

    container.modem.demuxStream(stream, stdout, stderr);

    connection.on("message", (data: Buffer) => {
      if (new TextDecoder().decode(data).startsWith("{")) {
        const parsed = JSON.parse(data.toString());

        exec.resize({
          h: parsed.rows,
          w: parsed.cols,
        });
      } else {
        stream.write(data);
      }
    });

    stdout.on("data", (chunk) => {
      connection.send(chunk.toString());
    });

    stderr.on("data", (chunk) => {
      connection.send(chunk.toString());
    });
  },
};

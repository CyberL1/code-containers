import Dockerode from "dockerode";
import type { Container, CreateContainerBody } from "#src/types/Container.ts";

const dockerode = new Dockerode();

export const getContainers = () => {
  const containers = dockerode.listContainers({
    filters: { label: ["code-containers.image"] },
    all: true,
  });

  return containers;
};

export const getContainer = (id: string) => {
  const container = dockerode.getContainer(id);
  return container;
};

export const createContainer = ({ name, image }: CreateContainerBody) => {
  const container = dockerode.createContainer({
    name: `code-containers-${name}`.toLowerCase(),
    Image: `code-containers/${image}`,
    Labels: {
      "code-containers.image": image,
    },
    NetworkingConfig: {
      EndpointsConfig: {
        "code-containers_default": {},
      },
    },
  });

  return container;
};

export const getContainerResponse = async (container: Dockerode.Container) => {
  const inspect = await container.inspect();

  const response = {
    id: inspect.Id,
    name: inspect.Name.slice(17),
    image: inspect.Config.Image.slice(16),
    status: inspect.State.Status,
  } as Container;

  return response;
};

import { getImages } from "#src/utils/images.ts";

export const methods = {
  get: async () => {
    const images = [];

    for (const image of await getImages()) {
      images.push(image.RepoTags[0]);
    }

    return images;
  },
};

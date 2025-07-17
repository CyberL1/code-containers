import type { Container } from "$lib/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch("/api/containers");
  return { containers: await response.json() as Container[] };
};

export const ssr = false;

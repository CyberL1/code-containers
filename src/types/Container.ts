export interface Container {
  id: string;
  name: string;
  image: string;
}

export interface CreateContainerBody {
  image: string;
}

export interface RemoveContainerParams {
  id: string;
}

export interface RemoveContainerQuery {
  force: string;
}

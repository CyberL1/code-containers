export interface Container {
  id: string;
  name: string;
  image: string;
  status: string;
  ip: string;
}

export interface Process {
  pid: number;
  user: string;
  command: string;
}

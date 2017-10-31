export enum Status {
  open = 1,
  done = 2,
}
export class Todo {
  id: number;
  title: string;
  status: Status;
  created: Date;
  list: string;
}

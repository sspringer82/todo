export enum Status {
  open,
  done,
}
export class Todo {
  id: number;
  title: string;
  status: Status;
  created: Date;
  list: string;
  due: Date;
  description: string;
}

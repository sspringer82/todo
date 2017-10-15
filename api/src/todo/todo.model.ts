import { Status, Todo } from './todo.type';

const data: Todo[] = [
  {
    id: 1,
    title: 'aufstehen',
    status: Status.done,
    created: new Date(2017, 9, 1),
  },
  {
    id: 2,
    title: 'essen',
    status: Status.done,
    created: new Date(2017, 9, 2),
  },
  {
    id: 3,
    title: 'schlafen gehen',
    status: Status.open,
    created: new Date(2017, 10, 1),
  },
];

const model = {
  getOne(id: number): Promise<Todo> {
    return new Promise((resolve: Function, reject: Function) => {
      const todo = data.find((todo: Todo) => {
        return todo.id === id;
      });
      if (todo) {
        resolve(todo);
      }
    });
  },
  getAll(): Promise<Todo[]> {
    return new Promise((resolve: Function, reject: Function) => {
      resolve(data);
    });
  },
  create(todo: Todo) {},
  update() {},
  delete() {},
};

export default model;

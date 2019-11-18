import { useState, useEffect } from 'react';
import { Todo, InputTypeTodo } from '../shared/Todo';
import axios from 'axios';
import update from 'immutability-helper';

export default function(): {
  todos: Todo[];
  save: (todo: InputTypeTodo) => void;
  toggleStatus: (todo: Todo) => void;
  remove: (todo: Todo) => void;
} {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/todos`);
      const data = await response.json();
      setTodos(data);
    }
    fetchData();
  }, []);

  async function save(todo: InputTypeTodo) {
    if (!todo.id) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER}/todos`,
        todo
      );
      setTodos(prevTodos => update(prevTodos, { $push: [data] }));
    } else {
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER}/todos/${todo.id}`,
        todo
      );
      setTodos(prevTodos =>
        update(prevTodos, {
          $apply: (t: Todo[]) =>
            t.map(x => {
              if (x.id === data.id) {
                return data;
              }
              return x;
            }),
        })
      );
    }
  }

  async function toggleStatus(todo: Todo) {
    save({
      ...todo,
      done: !todo.done,
    });
  }

  async function remove(todo: Todo) {
    await axios.delete(`${process.env.REACT_APP_SERVER}/todos/${todo.id}`);

    setTodos(prevTodos =>
      update(prevTodos, {
        $apply: (t: Todo[]) => t.filter(x => x.id !== todo.id),
      })
    );
  }

  return { todos, save, toggleStatus, remove };
}

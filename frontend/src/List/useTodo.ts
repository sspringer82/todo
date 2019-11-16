import { useState, useEffect } from "react";
import { Todo } from "../shared/Todo";
import axios from "axios";
import update from "immutability-helper";

export default function(): [
  Todo[],
  (title: string) => void,
  (todo: Todo) => void,
  (todo: Todo) => void
] {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/todos`);
      const data = await response.json();
      setTodos(data);
    }
    fetchData();
  }, []);

  async function save(title: string) {
    const { data } = await axios.post(`${process.env.REACT_APP_SERVER}/todos`, {
      title,
      done: false
    });
    setTodos(prevTodos => update(prevTodos, { $push: [data] }));
  }

  async function toggleStatus(todo: Todo) {
    const { data } = await axios.put(
      `${process.env.REACT_APP_SERVER}/todos/${todo.id}`,
      {
        ...todo,
        done: !todo.done
      }
    );
    setTodos(prevTodos =>
      update(prevTodos, {
        $apply: (t: Todo[]) =>
          t.map(x => {
            if (x.id === data.id) {
              return data;
            }
            return x;
          })
      })
    );
  }

  async function remove(todo: Todo) {
    await axios.delete(`${process.env.REACT_APP_SERVER}/todos/${todo.id}`);

    setTodos(prevTodos =>
      update(prevTodos, {
        $apply: (t: Todo[]) => t.filter(x => x.id !== todo.id)
      })
    );
  }

  return [todos, save, toggleStatus, remove];
}

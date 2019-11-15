import { useState, useEffect } from "react";
import { Todo } from "../shared/Todo";
import axios from "axios";
import update from "immutability-helper";

export default function(): [Todo[], (title: string) => void] {
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

  return [todos, save];
}

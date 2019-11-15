import { useState, useEffect } from "react";
import { Todo } from "../shared/Todo";

export default function(): Todo[] {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/todos`);
      const data = await response.json();
      setTodos(data);
    }
    fetchData();
  }, []);

  return todos;
}

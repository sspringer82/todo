import { useState, useEffect } from 'react';
import { Todo } from './Todo';

export default function(): Todo[] {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3001/todos');
      const data = await response.json();
      setTodos(data);
    }
    fetchData();
  }, []);

  return todos;
}

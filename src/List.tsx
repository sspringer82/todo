import React, { useEffect } from "react";
import ListItem from "./ListItem";
import { useTodo } from "./TodoContext";

const List: React.FC = () => {
  const [todos, setTodos] = useTodo();
  useEffect(() => {
    (async () => {
      const request = await fetch('http://localhost:3001/todo');
      const data = await request.json();
      setTodos(data);
    })();
  }, [setTodos]);
  return <div>
    {todos.map(todo => <ListItem todo={todo} />)}
  </div>;
};

export default List;

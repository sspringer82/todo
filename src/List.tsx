import React, { useEffect } from "react";
import ListItem from "./ListItem";
import { useTodo } from "./TodoContext";

const List: React.FC = () => {
  const [todos, setTodos] = useTodo();
  useEffect(() => {
    setTodos([{id: 1, title: 'Get up', done: true},{id: 2, title: 'Eat', done: false}, {id: 3, title: 'Sleep', done: false}])
  }, []);
  return <div>
    {todos.map(todo => <ListItem todo={todo} />)}
  </div>;
};

export default List;

import React, { useEffect } from "react";
import ListItem from "./ListItem";
import useTodoService from "../useTodoService";

const List: React.FC = () => {
  const {todos, getAll, remove } = useTodoService();
  useEffect(() => {
    getAll();
  }, [getAll]);
  return <div>
    {todos.map(todo => <ListItem key={todo.id} todo={todo} onDelete={remove}/>)}
  </div>;
};

export default List;

import React, { useEffect } from "react";
import useTodoService from "../useTodoService";
import ListComponent from './List';

const List: React.FC = () => {
  const { todos, getAll, remove, save } = useTodoService();
  useEffect(() => {
    getAll();
  }, [getAll]);
  return (
    <ListComponent todos={todos} save={save} remove={remove} />
  );
};

export default List;

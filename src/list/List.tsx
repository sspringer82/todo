import React, { useEffect } from "react";
import ListItem from "./ListItem";
import useTodoService from "../useTodoService";
import Form from "./Form";

const List: React.FC = () => {
  const { todos, getAll, remove, save } = useTodoService();
  useEffect(() => {
    getAll();
  }, [getAll]);
  return (
    <>
      <div>
        {todos.map((todo) => (
          <ListItem key={todo.id} todo={todo} onDelete={remove} onSave={save} />
        ))}
      </div>
      <Form onSave={save} />
    </>
  );
};

export default List;

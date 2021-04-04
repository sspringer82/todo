import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import useTodoService from "../useTodoService";
import Form from "./Form";

const List: React.FC = () => {
  const [editMode, setEditMode] = useState<number | null>(null);
  const { todos, getAll, remove, save } = useTodoService();
  useEffect(() => {
    getAll();
  }, [getAll]);
  return (
    <>
      <div>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            todo={todo}
            onDelete={remove}
            onSave={save}
            edit={editMode === todo.id}
            onEnableEdit={setEditMode}
          />
        ))}
      </div>
      <Form onSave={save} />
    </>
  );
};

export default List;

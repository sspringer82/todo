import produce from "immer";
import React, { useState } from "react";
import Form from "../list/Form";
import ListItem from "../list/ListItem";
import { SubtaskInput, Todo, TodoInput } from "../Todo";
import useSubtaskService from "../useSubtaskService";

type Props = {
  todo: Todo;
};

const Subtask: React.FC<Props> = ({ todo }) => {
  const { save, remove } = useSubtaskService();
  const [editMode, setEditMode] = useState<number | null>(null);

  return (
    <div>
      {todo.subtask?.length && todo.subtask.length > 0}{" "}
      {todo.subtask?.map((subtask) => (
        <ListItem
          key={subtask.id}
          todo={subtask}
          onDelete={remove}
          onSave={save}
          edit={editMode === todo.id}
          onEnableEdit={setEditMode}
        />
      ))}
      <Form
        onSave={async (item: TodoInput) => {
          const subtask = produce(item, (draftItem) => {
            (draftItem as SubtaskInput).todoId = todo.id;
          });
          save(subtask as SubtaskInput);
        }}
      />
    </div>
  );
};

export default Subtask;

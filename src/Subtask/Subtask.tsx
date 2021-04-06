import produce from "immer";
import React, { useState } from "react";
import Form from "../list/Form";
import ListItem from "../list/ListItem";
import { SubtaskInput, Todo, TodoInput } from "../Todo";
import useSubtaskService from "../useSubtaskService";

export type Props = {
  todo: Todo;
};

const Subtask: React.FC<Props> = ({ todo }) => {
  const { save, remove } = useSubtaskService();
  const [editMode, setEditMode] = useState<number | null>(null);

  return (
    <div>
      {todo.subtask?.map((subtask) => (
        <ListItem
          canEdit={false}
          key={subtask.id}
          todo={subtask}
          onDelete={remove}
          onSave={save}
          editModeEnabled={editMode === subtask.id}
          onEditModeEnable={setEditMode}
        />
      ))}
      <Form
        onSave={async (item: TodoInput) => {
          const subtask = produce(item, (draftItem) => {
            (draftItem as SubtaskInput).todoId = todo.id;
          });
          save(subtask as SubtaskInput);
        }}
        onCancel={() => setEditMode(null)}
      />
    </div>
  );
};

export default Subtask;

import React, { useState } from "react";
import ListItem from "./ListItem";
import Form from "./Form";
import { Todo, TodoInput } from '../Todo';

export type Props = {
  todos: Todo[],
  save(todo: TodoInput): Promise<void>,
  remove(id: number): Promise<void>,
}

const List: React.FC<Props> = ({todos, save, remove}) => {
  const [editMode, setEditMode] = useState<number | null>(null);

  return (
    <>
      <div>
        {todos.map((todo) => (
          <ListItem
            canEdit={true}
            key={todo.id}
            todo={todo}
            onDelete={remove}
            onSave={save}
            editModeEnabled={editMode === todo.id}
            onEditModeEnable={setEditMode}
          />
        ))}
      </div>
      <Form onSave={save} />
    </>
  );
};

export default List;

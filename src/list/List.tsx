import React, { useEffect, useState } from "react";
import ListItem from "../listItem/ListItem";
import InlineForm from "../inlineForm/InlineForm";
import { Todo, TodoInput } from '../Todo';

export type Props = {
  todos: Todo[],
  save(todo: TodoInput): Promise<void>,
  remove(id: number): Promise<void>,
}

const List: React.FC<Props> = ({todos, save, remove}) => {
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    setEditMode(null);
  }, [todos]);

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
      <InlineForm onSave={save} onCancel={() => {
        setEditMode(null);
        }} />
    </>
  );
};

export default List;

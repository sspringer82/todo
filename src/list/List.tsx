import React, { useEffect, useState } from "react";
import ListItem from "../listItem/ListItem";
import InlineForm from "../inlineForm/InlineForm";
import { Todo, TodoInput, Subtask, SubtaskInput } from "../Todo";
import { useLocation } from "react-router-dom";

export type Props = {
  canEdit: boolean;
  todos: Todo[] | Subtask[];
  save(todo: TodoInput | SubtaskInput): Promise<void>;
  remove(id: number): Promise<void>;
};

const List: React.FC<Props> = ({ todos, save, remove, canEdit }) => {
  const location = useLocation();
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    setEditMode(null);
  }, [todos]);

  let todoContent = [<div data-testid="no-todos" key="no-todos">Keine Aufgaben gefunden.</div>];
  if (todos && todos.length > 0) {
    todoContent = todos.map((todo: Todo | Subtask) => (
      <ListItem
        canEdit={canEdit}
        key={todo.id}
        todo={todo}
        onDelete={remove}
        onSave={save}
        editModeEnabled={editMode === todo.id}
        onEditModeEnable={setEditMode}
      />
    ));
  }

  let className = "md:flex flex-col gap-2";
  if (location.pathname !== "/") {
    className += " hidden";
  }

  if (editMode === null) {
    todoContent.push(<InlineForm
      onSave={save}
      onCancel={() => {
        setEditMode(null);
      }}
      key="inline-form"
    />)
  }

  return (
    <div className={className} data-testid="list-container">
      {todoContent}
    </div>
  );
};

export default List;

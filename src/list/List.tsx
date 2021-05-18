import React, { useEffect, useState } from "react";
import ListItem from "../listItem/ListItem";
import InlineForm from "../inlineForm/InlineForm";
import { Todo, TodoInput, Subtask } from "../Todo";
import { useLocation } from 'react-router-dom';

export type Props = {
  todos: Todo[] | Subtask[];
  save(todo: TodoInput): Promise<void>;
  remove(id: number): Promise<void>;
};

const List: React.FC<Props> = ({ todos, save, remove }) => {
  const location = useLocation();
  const [editMode, setEditMode] = useState<number | null>(null);

  useEffect(() => {
    setEditMode(null);
  }, [todos]);

  let todoContainer = <div data-testid="no-todos">Keine Aufgaben gefunden.</div>;
  if (todos && todos.length > 0) {
    todoContainer = (
      <div data-testid="todo-list">
        {todos.map((todo: Todo | Subtask) => (
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
    );
  }

  let className = '';

  if (location.pathname !== '/') {
    className += 'hidden md:block'
  }

  return (
    <div className={className} data-testid="list-container">
      {todoContainer}
      {editMode === null && <InlineForm
        onSave={save}
        onCancel={() => {
          setEditMode(null);
        }}
      />}
    </div>
  );
};

export default List;

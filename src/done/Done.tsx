import React from "react";
import { Todo, TodoInput } from "../Todo";
import produce from 'immer';

export type Props = {
  todo: Todo;
  onSave(todo: TodoInput): Promise<void>;
};

const Done: React.FC<Props> = ({ todo, onSave }) => {
  function handleStatusToggle(todo: Todo) {
    onSave(produce(todo, (draftTodo) => {draftTodo.done = !draftTodo.done}))
  }

  return (
    <div>
      <button onClick={() => handleStatusToggle(todo)} data-testid="done-button">
        {todo.done ? "✔" : "❌"}
      </button>
    </div>
  );
};

export default Done;

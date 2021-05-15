import React from "react";
import { Todo, TodoInput } from "../Todo";
import produce from "immer";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";

export type Props = {
  todo: Todo;
  onSave(todo: TodoInput): Promise<void>;
};

const Done: React.FC<Props> = ({ todo, onSave }) => {
  function handleStatusToggle(todo: Todo) {
    onSave(
      produce(todo, (draftTodo) => {
        draftTodo.done = !draftTodo.done;
      })
    );
  }

  return (
    <div>
      <button
        className="focus:outline-none"
        onClick={() => handleStatusToggle(todo)}
        data-testid="done-button"
      >
        {todo.done ? (
          <CheckIcon style={{ color: "limegreen" }} data-testid="done-done" />
        ) : (
          <ClearIcon style={{ color: "red" }} data-testid="done-notdone" />
        )}
      </button>
    </div>
  );
};

export default Done;

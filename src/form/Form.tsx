import React, { ChangeEvent, FormEvent } from "react";
import Subtask from "../Subtask/Subtask";
import { Todo, TodoInput } from "../Todo";

export type Props = {
  todo: TodoInput,
  onSubmit: (e: FormEvent) => Promise<void>,
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const Form: React.FC<Props> = ({todo, onSubmit, onChange }) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <fieldset>
          <label>
            Title:{" "}
            <input
              type="text"
              name="title"
              value={todo.title}
              onChange={onChange}
              data-testid="title"
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Done:{" "}
            <input
              type="checkbox"
              name="done"
              checked={todo.done}
              onChange={onChange}
              data-testid="done"
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Comment:
            <textarea
              name="comment"
              value={todo.comment}
              onChange={onChange}
              data-testid="comment"
            ></textarea>
          </label>
        </fieldset>
        <button type="submit">save</button>
      </form>
      {todo.id && <Subtask todo={todo as Todo} />}
    </>
  );
};

export default Form;

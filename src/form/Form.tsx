import React, { FormEvent } from "react";
import Subtask from "../Subtask/Subtask";
import { Todo, TodoInput } from "../Todo";
import useForm from "../useForm";

export type Props = {
  todo: TodoInput,
  onSubmit: (e: FormEvent) => Promise<void>,
}

const Form: React.FC<Props> = ({todo, onSubmit}) => {
  const { handleChange, item } = useForm<TodoInput>(
    todo,
  );

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
              value={item.title}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Done:{" "}
            <input
              type="checkbox"
              name="done"
              checked={item.done}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            Comment:
            <textarea
              name="comment"
              value={item.comment}
              onChange={handleChange}
            ></textarea>
          </label>
        </fieldset>
        <button type="submit">save</button>
      </form>
      {item.id && <Subtask todo={item as Todo} />}
    </>
  );
};

export default Form;

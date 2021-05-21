import React, { ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import Subtask from "../Subtask/Subtask.container";
import { Todo, TodoInput } from "../Todo";
import Button from "../util/button/Button";
import Input from "../util/input/Input";

export type Props = {
  todo: TodoInput;
  onSubmit: (e: FormEvent) => Promise<void>;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const Form: React.FC<Props> = ({ todo, onSubmit, onChange }) => {
  const history = useHistory();
  return (
    <>
      <form onSubmit={onSubmit} autoComplete="off">
        <Input
          label="Title"
          type="text"
          onChange={onChange}
          value={todo.title}
          name="title"
          data-testid="title"
          style={{width: '100%'}}
        />
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
        <button type="submit" data-testid="submit">
          save
        </button>
      </form>
      {todo.id && <Subtask todo={todo as Todo} />}
      <Button onClick={() => history.push("/")}>close</Button>
    </>
  );
};

export default Form;

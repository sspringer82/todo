import React, { ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import Subtask from "../Subtask/Subtask.container";
import { Todo, TodoInput } from "../Todo";
import Button from "../util/button/Button";
import { BottomDivider, Divider } from "../util/divider/Divider";
import Input from "../util/input/Input";
import Textarea from "../util/textarea/Textarea";

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
          style={{ width: "100%" }}
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
        <Textarea
          style={{ width: "100%" }}
          name="comment"
          value={todo.comment}
          onChange={onChange}
          data-testid="comment"
          label="Comment"
        />

        <Button type="submit" data-testid="submit" variant="primary">
          save
        </Button>
      </form>
      {todo.id && (
        <>
          <Divider containerStyle={{ margin: "10px -10px" }}>
            Subtasks{" "}
            {todo &&
              todo.subtask &&
              todo.subtask?.length > 0 &&
              `(${todo.subtask.length})`}
          </Divider>
          <Subtask todo={todo as Todo} />
        </>
      )}

      <BottomDivider containerStyle={{ margin: "10px -10px 15px -10px" }} />

      <Button style={{ marginTop: 10 }} onClick={() => history.push("/")}>
        close
      </Button>
    </>
  );
};

export default Form;

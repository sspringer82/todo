import React, { ChangeEvent, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import Subtask from "../Subtask/Subtask.container";
import { Todo, TodoInput } from "../Todo";
import Button from "../util/button/Button";
import Checkbox, { CheckboxChangeEvent } from "../util/checkbox/Checkbox";
import { BottomDivider } from "../util/divider/Divider";
import SubtaskDivider from "../util/divider/SubtaskDivider";
import Input from "../util/input/Input";
import Textarea from "../util/textarea/Textarea";

export type Props = { 
  todo: TodoInput;
  onSubmit: (e: FormEvent) => Promise<void>;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | CheckboxChangeEvent
  ) => void;
};

const Form: React.FC<Props> = ({ todo, onSubmit, onChange }) => {
  const history = useHistory();
  return (
    <>
      <form
        onSubmit={onSubmit}
        autoComplete="off"
        className="flex flex-col gap-4"
      >
        <Input
          label="Title"
          type="text"
          onChange={onChange}
          value={todo.title}
          name="title"
          data-testid="title"
        />
        <div className="flex">
          <Input
            label="Category"
            type="text"
            onChange={onChange}
            value={todo.category?.title}
            name="category"
            data-testid="category"
            style={{ width: "100%" }}
          />
          <Input
            label="Color"
            type="color"
            onChange={onChange}
            value={todo.category?.color}
            name="color"
            data-testid="color"
          />
        </div>
        <Checkbox
          label="Done"
          name="done"
          checked={todo.done}
          onChange={onChange}
          data-testid="done"
        />
        <Textarea
          style={{ width: "100%" }}
          name="comment"
          value={todo.comment}
          onChange={onChange}
          data-testid="comment"
          label="Comment"
        />
        <Input
            label="Due"
            type="text"
            onChange={onChange}
            value={todo.due}
            name="due"
            data-testid="due"
          />
        <div>
          <Button type="submit" data-testid="submit" variant="primary">
            save
          </Button>
        </div>
      </form>
      {todo.id && (
        <>
          <SubtaskDivider todo={todo} />
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

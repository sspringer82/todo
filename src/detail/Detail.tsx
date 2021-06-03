import React from "react";
import { useHistory } from "react-router-dom";
import Done from "../done/Done";
import Subtask from "../Subtask/Subtask.container";
import { Todo, TodoInput } from "../Todo";
import Button from "../util/button/Button";
import SubtaskDivider from "../util/divider/SubtaskDivider";

export type Props = {
  todo: Todo;
  onSave(todo: TodoInput): Promise<void>;
};

const Detail: React.FC<Props> = ({ todo, onSave }) => { 
  const history = useHistory();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        {todo && <Done todo={todo} onSave={onSave} />}
        <div data-testid="detail-title">{todo?.title}</div>
      </div>
      {todo && todo.comment && (
        <div data-testid="detail-comment" style={{ maxWidth: 422 }}>
          {todo?.comment}
        </div>
      )}
      <SubtaskDivider todo={todo} />
      {todo && todo.subtasks && todo.subtasks.length > 0 ? (
        <Subtask todo={todo!} />
      ) : (
        <div data-testid="detail-nosubtasks">Keine Unteraufgaben</div>
      )}
      {todo.due && <div data-testid="detail-due">Due: {todo.due}</div>}
      <div>Created: {todo?.created}</div>
      <div>Updated: {todo?.updated}</div>
      <div>
        <Button onClick={() => history.push("/")}>close</Button>
      </div>
    </div>
  );
};

export default Detail;

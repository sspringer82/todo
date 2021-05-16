import React from "react";
import Done from '../done/Done';
import Subtask from '../Subtask/Subtask.container';
import { Todo, TodoInput } from '../Todo';

export type Props = {
  todo: Todo,
  onSave(todo: TodoInput): Promise<void>;
}

const Detail: React.FC<Props> = ({todo, onSave}) => {
  return (
    <div>
      { todo && <Done todo={todo} onSave={onSave} /> }
      <div data-testid="detail-title">{todo?.title}</div>
      <div data-testid="detail-comment">{todo?.comment}</div>
      {todo && todo.subtask && todo.subtask.length > 0 ? <Subtask todo={todo!} /> : <div data-testid="detail-nosubtasks">Keine Unteraufgaben</div>}
      
    </div>
  );
};

export default Detail;

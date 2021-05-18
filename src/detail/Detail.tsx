import React from "react";
import { useHistory } from 'react-router-dom';
import Done from '../done/Done';
import Subtask from '../Subtask/Subtask.container';
import { Todo, TodoInput } from '../Todo';
import Button from '../util/button/Button';

export type Props = {
  todo: Todo,
  onSave(todo: TodoInput): Promise<void>;
}

const Detail: React.FC<Props> = ({todo, onSave}) => {
  const history = useHistory();
  return (
    <div>
      { todo && <Done todo={todo} onSave={onSave} /> }
      <div data-testid="detail-title">{todo?.title}</div>
      <div data-testid="detail-comment">{todo?.comment}</div>
      {todo && todo.subtask && todo.subtask.length > 0 ? <Subtask todo={todo!} /> : <div data-testid="detail-nosubtasks">Keine Unteraufgaben</div>}
      <Button onClick={() => history.push('/')}>close</Button>
    </div>
  );
};

export default Detail;

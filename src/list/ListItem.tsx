import React from "react";
import { Link } from 'react-router-dom';
import Done from '../done/Done';
import { Todo, TodoInput } from "../Todo";

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onSave(todo: TodoInput): Promise<void>;
};

const ListItem: React.FC<Props> = ({ todo, onDelete, onSave }) => {
  return (
    <div>
      <div>({todo.id}){todo.title}</div>
      <Done todo={todo} onSave={onSave} />
      <button onClick={() => onDelete(todo.id)}>delete</button>
      <Link to={`/edit/${todo.id}`}>edit</Link>
      <Link to={`/detail/${todo.id}`}>detail</Link>
    </div>
  );
};

export default ListItem;

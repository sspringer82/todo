import React from "react";
import { Link } from 'react-router-dom';
import Done from '../done/Done';
import { Todo } from "../Todo";

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
};

const ListItem: React.FC<Props> = ({ todo, onDelete }) => {
  return (
    <div>
      <div>({todo.id}){todo.title}</div>
      <Done todo={todo} />
      <button onClick={() => onDelete(todo.id)}>delete</button>
      <Link to={`/edit/${todo.id}`}>edit</Link>
      <Link to={`/detail/${todo.id}`}>detail</Link>
    </div>
  );
};

export default ListItem;

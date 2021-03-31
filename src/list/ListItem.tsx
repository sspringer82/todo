import React from "react";
import { Todo } from "../Todo";

type Props = {
  todo: Todo;
  onDelete: (id: number) => void;
  onStatusToggle: (todo: Todo) => void;
};

const ListItem: React.FC<Props> = ({ todo, onDelete, onStatusToggle }) => {
  return (
    <div>
      <div>{todo.title}</div>
      <div>
        <button onClick={() => onStatusToggle(todo)}>{todo.done ? "✔" : "❌"}</button>
      </div>
      <button onClick={() => onDelete(todo.id)}>delete</button>
    </div>
  );
};

export default ListItem;

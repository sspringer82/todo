import React from "react";
import { Link } from "react-router-dom";
import Done from "../done/Done";
import { Todo, TodoInput } from "../Todo";
import Form from "../inlineForm/Form";

export type Props = {
  editModeEnabled: boolean;
  todo: Todo;
  canEdit: boolean;
  onEditModeEnable: (id: number | null) => void;
  onDelete: (id: number) => void;
  onSave(todo: TodoInput): Promise<void>;
};

const ListItem: React.FC<Props> = ({
  todo,
  canEdit,
  onDelete,
  onSave,
  editModeEnabled: edit,
  onEditModeEnable: onEnableEdit,
}) => {
  if (edit) {
    return (
      <Form
      todo={todo}
        onSave={onSave}
        onCancel={() => onEnableEdit(null)}
      />
    );
  } else {
    return (
      <div>
        <div onClick={() => onEnableEdit(todo.id)}>
          ({todo.id}){todo.title}
        </div>
        <Done todo={todo} onSave={onSave} />
        <button onClick={() => onDelete(todo.id)}>delete</button>
        {canEdit && <Link to={`/edit/${todo.id}`}>edit</Link>}
        <Link to={`/detail/${todo.id}`}>detail</Link>
      </div>
    );
  }
};

export default ListItem;

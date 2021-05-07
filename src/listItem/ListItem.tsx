import React from "react";
import { Link } from "react-router-dom";
import Done from "../done/Done";
import { Todo, TodoInput } from "../Todo";
import InlineForm from "../inlineForm/InlineForm";
import { ActionsContainer, ButtonContainer, TitleContainer } from "./Border";
import DeleteIcon from "@material-ui/icons/Delete";
import BuildIcon from "@material-ui/icons/Build";
import SearchIcon from "@material-ui/icons/Search";

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
      <InlineForm
        todo={todo}
        onSave={onSave}
        onCancel={() => onEnableEdit(null)}
      />
    );
  } else {
    const actions = [
      <Link to={`/detail/${todo.id}`} data-testid="detail-link">
        <SearchIcon />
      </Link>,
      <button onClick={() => onDelete(todo.id)} data-testid="delete-button">
        <DeleteIcon />
      </button>,
    ];
    if (canEdit) {
      actions.push(
        <Link to={`/edit/${todo.id}`} data-testid="edit-link">
          <BuildIcon />
        </Link>
      );
    }
    return (
      <div data-testid="listItem-container" className="flex">
        <div
          onClick={() => onEnableEdit(todo.id)}
          data-testid="title"
          style={{ position: "relative" }}
        >
          <TitleContainer>{todo.title}</TitleContainer>
        </div>

        <ButtonContainer>
          <Done todo={todo} onSave={onSave} />
        </ButtonContainer>

        <ActionsContainer>{actions}</ActionsContainer>
      </div>
    );
  }
};

export default ListItem;

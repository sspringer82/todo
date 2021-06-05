import React from "react";
import { Link } from "react-router-dom";
import Done from "../done/Done";
import { Subtask, SubtaskInput, Todo, TodoInput } from "../Todo";
import InlineForm from "../inlineForm/InlineForm";
import { ActionsContainer, ButtonContainer, TitleContainer } from "./Border";
import DeleteIcon from "@material-ui/icons/Delete";
import BuildIcon from "@material-ui/icons/Build";
import SearchIcon from "@material-ui/icons/Search";
import { colors, textColor } from '../colors';
import { Temporal } from 'proposal-temporal';

export type Props = {
  editModeEnabled: boolean;
  todo: Todo | Subtask;
  canEdit: boolean;
  onEditModeEnable: (id: number | null) => void;
  onDelete: (id: number) => void;
  onSave(todo: TodoInput | SubtaskInput): Promise<void>;
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
      <Link to={`/detail/${todo.id}`} data-testid="detail-link" key="detail">
        <SearchIcon style={{color: todo.done ? textColor.inactive : textColor.active}} />
      </Link>,
      <button onClick={() => onDelete(todo.id)} data-testid="delete-button" key="delete">
        <DeleteIcon style={{color: todo.done ? textColor.inactive : textColor.active}} />
      </button>,
    ];
    if (canEdit) {
      actions.push(
        <Link to={`/edit/${todo.id}`} data-testid="edit-link" key="edit">
          <BuildIcon style={{color: todo.done ? textColor.inactive : textColor.active}} />
        </Link>
      );
    }

    let overdue = false;
    let color = colors.active;
    if (todo.done) {
      color = colors.inactive;
    } else if ((todo as Todo).due && Temporal.now.plainDateTimeISO().until(Temporal.PlainDateTime.from((todo as Todo).due)).total({unit: 'second'}) < 0) {
      color = colors.overdue;
      overdue = true;
    }

    return (
      <div data-testid="listItem-container" className="flex">
        <div
          onClick={() => onEnableEdit(todo.id)}
          data-testid="title"
          style={{ position: "relative"}}
        >
          <TitleContainer color={color} todo={todo} overdue={overdue} />
        </div>

        <ButtonContainer color={color}>
          <Done todo={todo} onSave={onSave} />
        </ButtonContainer>

        <ActionsContainer color={color}>{actions}</ActionsContainer>
      </div>
    );
  }
};

export default ListItem;

import React from "react";
import { Todo } from "../shared/Todo";
import { ListItem, Title } from "./Item.styles";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import MoreVertIcon from "@material-ui/icons/MoreVert";

interface Props {
  todo: Todo;
  onToggleStatus: (todo: Todo) => void;
}

const Item: React.FC<Props> = ({ todo, onToggleStatus }) => {
  return (
    <ListItem>
      {!todo.done && (
        <RadioButtonUncheckedIcon onClick={() => onToggleStatus(todo)} />
      )}
      {todo.done && (
        <CheckCircleOutlineIcon onClick={() => onToggleStatus(todo)} />
      )}
      <Title>{todo.title}</Title>
      <MoreVertIcon />
    </ListItem>
  );
};
export default Item;

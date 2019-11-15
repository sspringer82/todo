import React from "react";
import { Todo } from "../shared/Todo";
import { ListItem, Title } from "./Item.styles";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import MoreVertIcon from "@material-ui/icons/MoreVert";

interface Props {
  todo: Todo;
}

const Item: React.FC<Props> = ({ todo }) => {
  return (
    <ListItem>
      {!todo.done && <RadioButtonUncheckedIcon />}
      {todo.done && <CheckCircleOutlineIcon />}
      <Title>{todo.title}</Title>
      <MoreVertIcon />
    </ListItem>
  );
};
export default Item;

import React from "react";
import { Todo } from "../shared/Todo";
import { ListItem } from "./Item.styles";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

interface Props {
  todo: Todo;
}

const Item: React.FC<Props> = ({ todo }) => {
  return (
    <ListItem>
      {!todo.done && <RadioButtonUncheckedIcon />}
      {todo.done && <CheckCircleOutlineIcon />}
      {todo.title}
    </ListItem>
  );
};
export default Item;

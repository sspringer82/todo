import React, { useState } from "react";
import { Todo } from "../../../shared/Todo";
import { MenuContainer, Addition } from "./Item.styles";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";

import { useHistory } from "react-router-dom";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import EditIcon from "@material-ui/icons/Edit";
import {
  CheckCircleOutlineIcon,
  Title,
  ListItem,
} from "../../../shared/components/Item/Item.styles";
import Confirm from "../../../shared/components/confirm/Confirm";
import moment from "moment";
import { IconButton } from "@material-ui/core";
import Progress from "./Progress";

interface Props {
  todo: Todo;
  isActive: boolean;
  onActivate: (todo: Todo | null) => void;
  onChange: (todo: Todo) => void;
  onRemove: (todo: Todo) => void;
}

const MENU_WIDTH = 100;

const Item: React.FC<Props> = ({
  todo,
  onChange,
  onRemove,
  isActive,
  onActivate,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const history = useHistory();

  let subtasksDone = 0;
  if (todo.subtasks.length > 0) {
    subtasksDone = todo.subtasks.reduce((prev, curr) => {
      if (curr.done) {
        return prev + 1;
      }
      return prev;
    }, 0);
  }

  return (
    <>
      <Confirm
        open={open}
        title="löschen"
        content="Wirklich löschen?"
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          onRemove(todo);
          setShowMenu(false);
        }}
      ></Confirm>
      <ListItem isActive={isActive} onClick={() => onActivate(todo)}>
        {todo.subtasks.length > 0 && (
          <Progress
            percentage={(subtasksDone / todo.subtasks.length) * 100}
            color="green"
          />
        )}
        {!todo.done && (
          <IconButton onClick={() => onChange({ ...todo, done: true })}>
            <RadioButtonUncheckedIcon />
          </IconButton>
        )}
        {todo.done && (
          <IconButton onClick={() => onChange({ ...todo, done: false })}>
            <CheckCircleOutlineIcon style={{ color: "green" }} />
          </IconButton>
        )}
        <Title done={todo.done}>
          {todo.title}

          {todo.subtasks.length > 0 && (
            <Addition>
              &nbsp;{`(${subtasksDone} / ${todo.subtasks.length})`}
            </Addition>
          )}
          {todo.due && (
            <Addition>
              {`(bis ${moment(todo.due).format("DD.MM.YYYY")})`}
            </Addition>
          )}
        </Title>
        <IconButton
          onClick={() => onChange({ ...todo, starred: !todo.starred })}
        >
          {todo.starred ? (
            <StarIcon style={{ color: "gold" }} />
          ) : (
            <StarBorderIcon />
          )}
        </IconButton>

        <IconButton
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <MoreVertIcon />
        </IconButton>

        <MenuContainer style={{ width: showMenu ? MENU_WIDTH : 0 }}>
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setShowMenu(false);
              onActivate(null);
              history.push(`/edit/${todo.id}`);
            }}
          >
            <EditIcon />
          </IconButton>
        </MenuContainer>
      </ListItem>
    </>
  );
};
export default Item;

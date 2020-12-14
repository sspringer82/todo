import React, { useState } from 'react';
import { Todo } from '../../../shared/Todo';
import { MenuContainer, EditIcon } from './Item.styles';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';

import { useHistory } from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {
  CheckCircleOutlineIcon,
  Title,
  ListItem,
} from '../../../shared/components/Item/Item.styles';
import Confirm from '../../../shared/components/confirm/Confirm';
import moment from 'moment';
import { IconButton } from '@material-ui/core';

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
        <IconButton>
          {!todo.done && (
            <RadioButtonUncheckedIcon
              style={{ color: 'white' }}
              onClick={() => onChange({ ...todo, done: true })}
            />
          )}
          {todo.done && (
            <CheckCircleOutlineIcon
              style={{ color: 'lawngreen' }}
              onClick={() => onChange({ ...todo, done: false })}
            />
          )}
        </IconButton>
        <Title done={todo.done}>
          {todo.title}

          {todo.subtasks.length > 0 && (
            <>
              &nbsp;(
              {todo.subtasks.reduce((prev, curr) => {
                if (curr.done) {
                  return prev + 1;
                }
                return prev;
              }, 0)}{' '}
              / {todo.subtasks.length})
            </>
          )}
          {todo.due && ` (bis ${moment(todo.due).format('DD.MM.YYYY')})`}
        </Title>
        <IconButton
          onClick={() => onChange({ ...todo, starred: !todo.starred })}
        >
          {todo.starred ? (
            <StarIcon style={{ color: 'yellow' }} />
          ) : (
            <StarBorderIcon style={{ color: 'white' }} />
          )}
        </IconButton>

        <IconButton
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <MoreVertIcon style={{ color: 'white' }} />
        </IconButton>

        <MenuContainer style={{ width: showMenu ? MENU_WIDTH : 0 }}>
          <IconButton
            onClick={() => {
              setOpen(true);
            }}
          >
            <DeleteIcon style={{ color: 'white' }} />
          </IconButton>
          <IconButton
            onClick={() => {
              setShowMenu(false);
              onActivate(null);
              history.push(`/edit/${todo.id}`);
            }}
          >
            <EditIcon style={{ color: 'white' }} />
          </IconButton>
        </MenuContainer>
      </ListItem>
    </>
  );
};
export default Item;

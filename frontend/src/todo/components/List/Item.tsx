import React, { useState } from 'react';
import { Todo } from '../../../shared/Todo';
import { ListItem, Title, MenuContainer } from './Item.styles';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom';

interface Props {
  todo: Todo;
  onStatusChange: (todo: Todo) => void;
  onRemove: (todo: Todo) => void;
}

const Item: React.FC<Props> = ({ todo, onStatusChange, onRemove }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <ListItem>
      {!todo.done && (
        <RadioButtonUncheckedIcon
          onClick={() => onStatusChange({ ...todo, done: true })}
        />
      )}
      {todo.done && (
        <CheckCircleOutlineIcon
          onClick={() => onStatusChange({ ...todo, done: false })}
        />
      )}
      <Title>{todo.title}</Title>
      <MoreVertIcon
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      />
      <MenuContainer style={{ width: showMenu ? 53 : 0 }}>
        <DeleteIcon
          onClick={() => {
            onRemove(todo);
            setShowMenu(false);
          }}
        />
        <Link to={`/edit/${todo.id}`}>
          <EditIcon onClick={() => setShowMenu(false)} />
        </Link>
      </MenuContainer>
    </ListItem>
  );
};
export default Item;

import React from 'react';
import { Subtask } from '../../../shared/Subtask';
import EditIcon from '@material-ui/icons/Edit';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { ListItem } from '@material-ui/core';
import { Title } from '../../../shared/components/Item/Item.styles';
import DeleteIcon from '@material-ui/icons/Delete';

interface Props {
  subtask: Subtask;
  onEdit: (subtask: Subtask) => void;
  onStateChange: (subtask: Subtask) => void;
  onDelete: (subtask: Subtask) => void;
}

const Item: React.FC<Props> = ({
  subtask,
  onEdit,
  onStateChange,
  onDelete,
}) => {
  return (
    <ListItem>
      {!subtask.done && (
        <RadioButtonUncheckedIcon
          onClick={() => onStateChange({ ...subtask, done: true })}
        />
      )}
      {subtask.done && (
        <CheckCircleOutlineIcon
          onClick={() => onStateChange({ ...subtask, done: false })}
        />
      )}
      <Title done={subtask.done}>{subtask.title}</Title>
      <EditIcon onClick={() => onEdit(subtask)} />
      <DeleteIcon onClick={() => onDelete(subtask)} />
    </ListItem>
  );
};

export default Item;

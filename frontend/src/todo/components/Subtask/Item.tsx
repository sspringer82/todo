import React, { useState } from 'react';
import { Subtask } from '../../../shared/Subtask';
import EditIcon from '@material-ui/icons/Edit';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { ListItem } from '@material-ui/core';
import { Title } from '../../../shared/components/Item/Item.styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Confirm from '../../../shared/components/confirm/Confirm';

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
  const [open, setOpen] = useState(false);
  return (
    <>
      <Confirm
        open={open}
        title="löschen"
        content="Wirklich löschen?"
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          onDelete(subtask);
        }}
      ></Confirm>
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
        <DeleteIcon onClick={() => setOpen(true)} />
      </ListItem>
    </>
  );
};

export default Item;

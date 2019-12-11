import React from 'react';
import { Subtask } from '../../../shared/Subtask';
import EditIcon from '@material-ui/icons/Edit';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

interface Props {
  subtask: Subtask;
  onEdit: () => void;
  onStateChange: (subtask: Subtask) => void;
}

const Item: React.FC<Props> = ({ subtask, onEdit, onStateChange }) => {
  return (
    <div>
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
      {subtask.title}
      <EditIcon onClick={onEdit} />
    </div>
  );
};

export default Item;

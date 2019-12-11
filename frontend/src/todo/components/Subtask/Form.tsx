import React from 'react';
import { Subtask, InputTypeSubtask } from '../../../shared/Subtask';

interface Props {
  subtask?: Subtask;
  onSave: (subtask: InputTypeSubtask) => void;
  onCancel: () => void;
}

// @todo default prop für subtask?
const Form: React.FC<Props> = ({ subtask }) => {
  return <form>Edit/Create</form>;
};

export default Form;

import React, { useState, useEffect } from 'react';
import { Subtask, InputTypeSubtask } from '../../../shared/Subtask';
import { Todo } from '../../../shared/Todo';

interface Props {
  todo: Todo;
  subtask?: Subtask;
  onSave: (subtask: InputTypeSubtask) => void;
  onCancel: () => void;
}

// @todo default prop für subtask?
const Form: React.FC<Props> = ({ subtask, todo }) => {
  const initialSubtask: InputTypeSubtask = {
    title: '',
    done: false,
    todo,
  };
  const [subtaskToBeSaved, setSubtaskToBeSaved] = useState(initialSubtask);

  useEffect(() => {
    if (subtask) {
      setSubtaskToBeSaved(subtask);
    }
  }, [subtask]);

  return <form>Edit/Create</form>;
};

export default Form;

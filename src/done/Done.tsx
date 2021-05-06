import React from 'react';
import { Todo, TodoInput } from '../Todo';
import produce from 'immer';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

export type Props = {
  todo: Todo;
  onSave(todo: TodoInput): Promise<void>;
};

const Done: React.FC<Props> = ({ todo, onSave }) => {
  function handleStatusToggle(todo: Todo) {
    onSave(
      produce(todo, (draftTodo) => {
        draftTodo.done = !draftTodo.done;
      }),
    );
  }

  return (
    <div>
      <button
        onClick={() => handleStatusToggle(todo)}
        data-testid="done-button"
      >
        {todo.done ? (
          <CheckIcon style={{ color: 'limegreen' }} />
        ) : (
          <ClearIcon style={{ color: 'red' }} />
        )}
      </button>
    </div>
  );
};

export default Done;

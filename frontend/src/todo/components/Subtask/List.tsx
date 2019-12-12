import React, { useState } from 'react';
import { Subtask, InputTypeSubtask } from '../../../shared/Subtask';
import Item from './Item';
import Form from './Form';
import { Todo } from '../../../shared/Todo';

interface Props {
  subtasks: Subtask[];
  todo: Todo;
}

const List: React.FC<Props> = ({ subtasks, todo }) => {
  const [inEditMode, setInEditMode] = useState<number | null>(null);

  return (
    <div>
      {subtasks.map(subtask =>
        subtask.id === inEditMode ? (
          <Form
            todo={todo}
            subtask={subtask}
            key={subtask.id}
            onSave={(subtask: InputTypeSubtask) => console.log(subtask)}
            onCancel={() => setInEditMode(null)}
          />
        ) : (
          <Item
            subtask={subtask}
            key={subtask.id}
            onEdit={() => setInEditMode(subtask.id)}
            onStateChange={(subtask: Subtask) => console.log(subtask)}
          />
        )
      )}

      {inEditMode === null && (
        <Form
          todo={todo}
          onSave={(subtask: InputTypeSubtask) => console.log(subtask)}
          onCancel={() => setInEditMode(null)}
        />
      )}
    </div>
  );
};

export default List;

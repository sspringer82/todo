import React, { useState } from 'react';
import { Subtask, InputTypeSubtask } from '../../../shared/Subtask';
import Item from './Item';
import Form from './Form';

interface Props {
  subtasks: Subtask[];
}

const List: React.FC<Props> = ({ subtasks }) => {
  const [inEditMode, setInEditMode] = useState<number | null>(null);

  return (
    <div>
      {subtasks.map(subtask =>
        subtask.id === inEditMode ? (
          <Form
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
          onSave={(subtask: InputTypeSubtask) => console.log(subtask)}
          onCancel={() => setInEditMode(null)}
        />
      )}
    </div>
  );
};

export default List;

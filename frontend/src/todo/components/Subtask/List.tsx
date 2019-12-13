import React, { useState } from 'react';
import { Subtask } from '../../../shared/Subtask';
import Item from './Item';
import { Todo } from '../../../shared/Todo';
import InlineEdit from '../../../shared/components/InlineEdit/InlineEdit';

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
          <InlineEdit
            task={subtask}
            onSave={({ title }) => {
              setInEditMode(null);
              console.log(title);
            }}
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
        <InlineEdit
          onSave={({ title }) => {
            setInEditMode(null);
            console.log(title);
          }}
        />
      )}
    </div>
  );
};

export default List;

import React, { useState } from 'react';
import { Subtask } from '../../../shared/Subtask';
import Item from './Item';
import { Todo } from '../../../shared/Todo';
import InlineEdit from '../../../shared/components/InlineEdit/InlineEdit';
import { useDispatch } from 'react-redux';
import {
  deleteSubtaskAction,
  saveSubtaskAction,
} from '../../actions/subtask.actions';
import update from 'immutability-helper';

interface Props {
  subtasks?: Subtask[];
  todo: Todo;
}

const List: React.FC<Props> = ({ subtasks, todo }) => {
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState<number | null>(null);

  return (
    <div>
      {subtasks &&
        subtasks.map(subtask =>
          subtask.id === inEditMode ? (
            <InlineEdit
              task={subtask}
              onSave={({ title }) => {
                setInEditMode(null);
                dispatch(
                  saveSubtaskAction(update(subtask, { title: { $set: title } }))
                );
              }}
            />
          ) : (
            <Item
              subtask={subtask}
              key={subtask.id}
              onEdit={(subtask: Subtask) => setInEditMode(subtask.id)}
              onStateChange={(subtask: Subtask) => console.log(subtask)}
              onDelete={(subtask: Subtask) =>
                dispatch(deleteSubtaskAction(subtask))
              }
            />
          )
        )}

      {inEditMode === null && (
        <InlineEdit
          onSave={({ title }) => {
            setInEditMode(null);
            dispatch(
              saveSubtaskAction({
                title,
                done: false,
                todo,
              })
            );
          }}
        />
      )}
    </div>
  );
};

export default List;

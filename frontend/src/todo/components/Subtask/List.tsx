import React, { useState } from 'react';
import { Subtask } from '../../../shared/Subtask';
import Item from './Item';
import { Todo } from '../../../shared/Todo';
import InlineEdit from '../../../shared/components/InlineEdit/InlineEdit';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteSubtaskAction,
  saveSubtaskAction,
} from '../../actions/subtask.actions';
import update from 'immutability-helper';
import { getSubtasks } from '../../selectors/subtask.selector';

interface Props {
  todo: Todo;
}

const List: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState<number | null>(null);
  const subtasks = useSelector(getSubtasks(todo.id));

  return (
    <div>
      {subtasks &&
        subtasks.map(subtask =>
          subtask.id === inEditMode ? (
            <InlineEdit
              task={subtask}
              key={subtask.id}
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
              onStateChange={(subtask: Subtask) =>
                dispatch(saveSubtaskAction(subtask))
              }
              onDelete={(subtask: Subtask) =>
                dispatch(deleteSubtaskAction.request(subtask))
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

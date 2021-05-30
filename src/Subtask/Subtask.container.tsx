import React from 'react';
import useSubtaskService from '../hooks/useSubtaskService';
import List from '../list/List';
import { Todo } from '../Todo';

type Props = {
  todo: Todo;
};

const Subtask: React.FC<Props> = ({ todo }) => {
  const { save, remove } = useSubtaskService();
  return <List todos={todo.subtasks!} save={save} remove={remove} canEdit={false} />;
};

export default Subtask;

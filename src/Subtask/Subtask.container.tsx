import React from 'react';
import List from '../list/List';
import { Todo } from '../Todo';
import useSubtaskService from '../useSubtaskService';

type Props = {
  todo: Todo
}

const Subtask: React.FC<Props> = ({todo}) => {
  const { save, remove } = useSubtaskService();
  return <List todos={todo.subtask!} save={save} remove={remove} />
}

export default Subtask;
import React from 'react';
import Form from '../list/Form';
import ListItem from '../list/ListItem';
import {SubtaskInput, Todo, TodoInput } from '../Todo';
import useSubtaskService from '../useSubtaskService';

type Props = {
  todo: Todo;
}
 
const Subtask: React.FC<Props> = ({todo}) => {
  const {save, remove} = useSubtaskService();

  return (<div>
    {todo.subtask?.length && todo.subtask.length > 0} {
      todo.subtask?.map(subtask => <ListItem key={subtask.id} todo={subtask} onDelete={remove} />)
    }
  
    <Form onSave={async (item: TodoInput) => {
      (item as SubtaskInput).todoId = todo.id;
      save(item as SubtaskInput);
    }}/>
  </div>);
}

export default Subtask;
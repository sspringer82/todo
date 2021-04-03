import React from 'react';
import Form from '../list/Form';
import ListItem from '../list/ListItem';
import { Subtask as SubtaskType, TodoInput } from '../Todo';

type Props = {
  subtasks?: SubtaskType[]
}

const Subtask: React.FC<Props> = ({subtasks}) => {
  return (<div>
    {subtasks?.length && subtasks.length > 0} {
      subtasks?.map(subtask => <ListItem key={subtask.id} todo={subtask} onDelete={(id) => 'foo'} />)
    }
  
    <Form onSave={async (item: TodoInput) => {
      // @todo implement save
      console.log('TODO: create Subtask');
    }}/>
  </div>);
}

export default Subtask;
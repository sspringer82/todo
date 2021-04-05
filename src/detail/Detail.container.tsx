import React from 'react';
import { useParams } from 'react-router-dom';
import { useTodo } from '../TodoContext';
import useTodoService from '../useTodoService';
import Detail from './Detail';

const DetailContainer: React.FC = () => {
  const { save } = useTodoService();
  const [todos] = useTodo();
  const { id } = useParams<{ id: string }>();

  const todo = todos.find((todo) => todo.id === parseInt(id, 10));

  return <Detail todo={todo!} onSave={save} />
}

export default DetailContainer;
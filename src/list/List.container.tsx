import React, { useEffect } from 'react';
import useTodoService from '../hooks/useTodoService';
import ListComponent from './List';

const List: React.FC = () => {
  const { todos, getAll, remove, save } = useTodoService();
  useEffect(() => {
    getAll();
  }, [getAll]);
  return <ListComponent todos={todos} save={save} remove={remove} canEdit={true} />;
};

export default List;

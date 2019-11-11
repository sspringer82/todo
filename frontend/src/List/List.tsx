import React from 'react';
import useTodo from './useTodo';
import Item from './Item';

const List: React.FC = () => {
  const todos = useTodo();

  return (
    <ul>
      {todos.map(todo => (
        <Item todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
export default List;

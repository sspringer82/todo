import React, { useEffect } from "react";
import ListItem from "./ListItem";
import useTodoService from "../useTodoService";
import { Todo } from '../Todo';
import produce from 'immer';

const List: React.FC = () => {
  const {todos, getAll, remove, save } = useTodoService();
  useEffect(() => {
    getAll();
  }, [getAll]);
  return <div>
    {todos.map(todo => <ListItem key={todo.id} todo={todo} onDelete={remove} onStatusToggle={(todo: Todo) => {
      save(produce(todo, (draftTodo) => {draftTodo.done = !draftTodo.done}))
    }}/>)}
  </div>;
};

export default List;

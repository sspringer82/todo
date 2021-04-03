import React from "react";
import { useParams } from "react-router";
import Done from '../done/Done';
import Subtask from '../Subtask/Subtask';
import { useTodo } from "../TodoContext";
import useTodoService from '../useTodoService';

const Detail: React.FC = () => {
  const { save } = useTodoService();
  const [todos] = useTodo();
  const { id } = useParams<{ id: string }>();

  const todo = todos.find((todo) => todo.id === parseInt(id, 10));

  return (
    <div>
      { todo && <Done todo={todo} onSave={save} /> }
      <div>{todo?.title}</div>
      <div>{todo?.comment}</div>
      <Subtask todo={todo!} />
    </div>
  );
};

export default Detail;

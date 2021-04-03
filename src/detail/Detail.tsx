import React from "react";
import { useParams } from "react-router";
import Done from '../done/Done';
import Subtask from '../Subtask/Subtask';
import { useTodo } from "../TodoContext";

const Detail: React.FC = () => {
  const [todos] = useTodo();
  const { id } = useParams<{ id: string }>();

  const todo = todos.find((todo) => todo.id === parseInt(id, 10));

  return (
    <div>
      { todo && <Done todo={todo} /> }
      <div>{todo?.title}</div>
      <div>{todo?.comment}</div>
      <Subtask subtasks={todo?.subtask} />
    </div>
  );
};

export default Detail;

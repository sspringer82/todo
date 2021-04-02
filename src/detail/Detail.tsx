import React from "react";
import { useParams } from "react-router";
import { useTodo } from "../TodoContext";

const Detail: React.FC = () => {
  const [todos] = useTodo();
  const { id } = useParams<{ id: string }>();

  const todo = todos.find((todo) => todo.id === parseInt(id, 10));

  return (
    <div>
      <div>{todo?.title}</div>
      <div>{todo?.comment}</div>
    </div>
  );
};

export default Detail;

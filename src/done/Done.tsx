import React from "react";
import { Todo } from "../Todo";
import useTodoService from "../useTodoService";
import produce from 'immer';

type Props = {
  todo: Todo;
};

const Done: React.FC<Props> = ({ todo }) => {
  const { save } = useTodoService();

  function handleStatusToggle(todo: Todo) {
    save(produce(todo, (draftTodo) => {draftTodo.done = !draftTodo.done}))
  }

  return (
    <div>
      <button onClick={() => handleStatusToggle(todo)}>
        {todo.done ? "✔" : "❌"}
      </button>
    </div>
  );
};

export default Done;

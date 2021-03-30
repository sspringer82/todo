import React, { ChangeEvent, FormEvent, useState } from "react";
import { TodoInput } from "./Todo";
import produce from "immer";
import useTodoService from "./useTodoService";

const initialTodo: TodoInput = {
  title: "",
  done: false,
};

const Form: React.FC = () => {
  const [todo, setTodo] = useState<TodoInput>(initialTodo);
  const {save} = useTodoService();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const name = e.target.name as keyof TodoInput;
    setTodo((prevState) =>
      produce(prevState, (draftState) => {
        draftState[name] = value as never;
      })
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await save(todo);
    setTodo(initialTodo);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        value={todo.title}
        name="title"
      />
      <button type="submit">save</button>
    </form>
  );
};

export default Form;

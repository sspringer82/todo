import React from "react";
import { TodoInput } from "./Todo";
import useForm from "./useForm";
import useTodoService from './useTodoService';

const initialTodo: TodoInput = {
  title: "",
  done: false,
};

const Form: React.FC = () => {
  const {save} = useTodoService();

  const { handleSubmit, handleChange, item } = useForm<TodoInput>(
    initialTodo,
    save
  );
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>
          Title:{" "}
          <input
            type="text"
            name="title"
            value={item.title}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <fieldset>
        <label>
          Done:{" "}
          <input
            type="checkbox"
            name="done"
            checked={item.done}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">save</button>
    </form>
  );
};

export default Form;

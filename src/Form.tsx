import React, { useEffect } from "react";
import { useParams } from 'react-router';
import { TodoInput } from "./Todo";
import useForm from "./useForm";
import useTodoService from './useTodoService';

const initialTodo: TodoInput = {
  title: "",
  done: false,
};

const Form: React.FC = () => {
  const {id} = useParams<{id: string}>();
  const {save, getOneById} = useTodoService();
  const { handleSubmit, handleChange, setItem, item } = useForm<TodoInput>(
    initialTodo,
    save
  );

  useEffect(() => {
    (async () => {
      const todo = await getOneById(parseInt(id, 10));
      setItem(todo);
    })();
  }, [id]);

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

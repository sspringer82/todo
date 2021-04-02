import React, { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router";
import { initialTodo, TodoInput } from "../Todo";
import useForm from "../useForm";
import useTodoService from "../useTodoService";

const Form: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { save, getOneById } = useTodoService();
  const { handleSubmit, handleChange, setItem, item } = useForm<TodoInput>(
    initialTodo,
    save
  );

  const getById = useRef(getOneById);

  useEffect(() => {
    (async () => {
      const todo = await getById.current(parseInt(id, 10));
      setItem(todo);
    })();
  }, [id, getById, setItem]);

  return (
    <form
      onSubmit={async (e) => {
        await handleSubmit(e);
        history.push("/");
      }}
      autoComplete="off"
    >
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
      <fieldset>
        <label>
          Comment:
          <textarea name="comment" value={item.comment} onChange={handleChange}></textarea>
        </label>
      </fieldset>
      <button type="submit">save</button>
    </form>
  );
};

export default Form;
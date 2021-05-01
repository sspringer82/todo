import React, { FormEvent, useEffect,  useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { TodoInput, initialTodo } from "../Todo";
import useForm from "../useForm";
import useTodoService from "../useTodoService";
import FormComponent from "./Form";

const Form: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { save, getOneById } = useTodoService();
  const {
    handleSubmit: handleTodoSubmit,
    setItem,
    item,
    handleChange,
  } = useForm<TodoInput>(initialTodo, save);

  const getById = useRef(getOneById);

  useEffect(() => {
    (async () => {
      const todoId = parseInt(id, 10);
      if (todoId) {
        const todo = await getById.current(todoId);
        setItem(todo);
      }
    })();
  }, [id, setItem, getById]);

  async function handleSubmit(e: FormEvent) {
    await handleTodoSubmit(e);
    history.push("/");
  }

  return (
    <FormComponent
      todo={item}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
  );
};

export default Form;

import React, { FormEvent, useCallback, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { TodoInput, initialTodo } from '../Todo';
import useForm from '../useForm';
import useTodoService from '../useTodoService';
import FormComponent from "./Form";

const Form: React.FC = () => {

  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const { save, getOneById } = useTodoService();
  const { handleSubmit: handleTodoSubmit, setItem, item } = useForm<TodoInput>(
    initialTodo,
    save
  );

  const getById = useCallback(getOneById, [getOneById]);

  useEffect(() => {
    (async () => {
      const todo = await getById(parseInt(id, 10));
      setItem(todo);
    })();
  }, [id, getById, setItem]);

  async function handleSubmit(e: FormEvent) {
    await handleTodoSubmit(e);
    history.push("/");
  }

  return <FormComponent todo={item} onSubmit={handleSubmit} />;
};

export default Form;

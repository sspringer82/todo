import React from 'react';
import { TodoInput } from '../Todo';
import useForm from '../useForm';
import useTodoService from '../useTodoService';

const initialTodo: TodoInput = {
  title: '',
  done: false,
};

const Form: React.FC = () => {
  const {save} = useTodoService();
  const {handleSubmit, handleChange, item} = useForm<TodoInput>(initialTodo, save);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        value={item.title}
        name="title"
      />
      <button type="submit">save</button>
    </form>
  );
};

export default Form;

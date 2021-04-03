import React from 'react';
import { initialTodo, TodoInput } from '../Todo';
import useForm from '../useForm';
import useTodoService from '../useTodoService';

type Props = {
  onSave: (item: TodoInput) => Promise<void>
}

const Form: React.FC<Props> = ({onSave}) => {
  // 
  const {handleSubmit, handleChange, item} = useForm<TodoInput>(initialTodo, onSave);

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

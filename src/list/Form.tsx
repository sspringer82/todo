import React from 'react';
import { initialTodo, Todo, TodoInput } from '../Todo';
import useForm from '../useForm';

type Props = {
  todo?: Todo;
  onSave: (item: TodoInput) => Promise<void>
}

// @todo generic component?
const Form: React.FC<Props> = ({todo, onSave}) => {
  const initialValue = todo ? todo : initialTodo;
  const {handleSubmit, handleChange, item} = useForm<TodoInput>(initialValue, onSave);

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

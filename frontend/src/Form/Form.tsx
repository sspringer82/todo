import React, { useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import update from 'immutability-helper';
import {
  Switch,
  FormControlLabel,
  Dialog,
  Button,
  TextField,
} from '@material-ui/core';
import { InputTypeTodo } from '../shared/Todo';

interface Props {}

const Form: React.FC<Props> = () => {
  const history = useHistory();
  function handleClose() {
    history.push('/');
  }

  const [todo, setTodo] = useState<InputTypeTodo>({
    title: '',
    done: false,
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const field = e.currentTarget.name;
    const value =
      field === 'done' ? e.currentTarget.checked : e.currentTarget.value;

    setTodo((prevTodo: InputTypeTodo) =>
      update(prevTodo, { [field]: { $set: value } })
    );
  }

  return (
    <Dialog onClose={handleClose} open={true}>
      <form>
        <div>
          <TextField
            label="Aufgabe"
            name="title"
            onChange={handleChange}
            value={todo.title}
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={todo.done}
                onChange={handleChange}
                value={true}
                name="done"
              />
            }
            label="Erledigt"
          />
        </div>
        <div>
          <Button>speichern</Button>
          <Button color="secondary" onClick={handleClose}>
            abbrechen
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default Form;

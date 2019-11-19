import React, { useState, ChangeEvent, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import update from 'immutability-helper';
import {
  Switch,
  FormControlLabel,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import { InputTypeTodo, Todo } from '../shared/Todo';

interface Props {
  todos: Todo[];
  onSave: (todo: InputTypeTodo) => void;
}

const Form: React.FC<Props> = ({ todos, onSave }) => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  function handleClose() {
    history.push('/');
  }

  const [todo, setTodo] = useState<InputTypeTodo>({
    title: '',
    done: false,
  });
  useEffect(() => {
    const todo = todos.find(todo => todo.id === parseInt(params.id, 10));
    if (todo) {
      setTodo(todo);
    }
  }, [params.id, todos]);

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
      <DialogTitle>Aufgabe bearbeiten</DialogTitle>
      <DialogContent>
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
        </form>
      </DialogContent>
      <DialogActions>
        <div>
          <Button
            onClick={() => {
              onSave(todo);
              handleClose();
            }}
          >
            speichern
          </Button>
          <Button color="secondary" onClick={handleClose}>
            abbrechen
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default Form;

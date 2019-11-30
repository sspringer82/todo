import React from 'react';
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
import useForm from './useForm';
import moment from 'moment';

const Form: React.FC = () => {
  const { todo, handleChange, handleClose, handleSave } = useForm();
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
          <div>{moment(todo.createdAt).format('DD.MM.YYYY hh:mm:ss')}</div>
        </form>
      </DialogContent>
      <DialogActions>
        <div>
          <Button
            onClick={() => {
              handleSave(todo);
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

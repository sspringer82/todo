import React from 'react';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Tabs,
  Tab,
} from '@material-ui/core';
import useForm from './useForm';
import General from './General';
import Subtasks from './Subtasks';
import { Todo } from '../../../shared/Todo';

const Form: React.FC = () => {
  const { todo, handleChange, handleClose, handleSave } = useForm();

  const [tab, setTab] = React.useState(0);

  return (
    <Dialog onClose={handleClose} open={true}>
      <form
        onSubmit={() => {
          handleSave(todo);
          handleClose();
        }}
      >
        <DialogTitle>Aufgabe bearbeiten</DialogTitle>
        <Tabs value={tab} onChange={(e, value) => setTab(value)}>
          <Tab label="Allgemein" id="simple-tab-0" />

          {todo.id && <Tab label="Subtasks" id="simple-tab-1" />}
        </Tabs>
        <DialogContent>
          <General
            todo={todo}
            tabIndex={0}
            tab={tab}
            handleChange={handleChange}
          />
          {todo.id && <Subtasks tabIndex={1} tab={tab} todo={todo as Todo} />}
        </DialogContent>
        <DialogActions>
          <div>
            <Button type="submit">speichern</Button>
            <Button color="secondary" onClick={handleClose}>
              abbrechen
            </Button>
          </div>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default Form;

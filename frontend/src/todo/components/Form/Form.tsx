import React from 'react';
import {
  Dialog,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core';
import useForm from './useForm';
import General from './General';
import Sharing from './Sharing';
import Subtasks from './Subtasks';

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
          <Tab label="Sharing" id="simple-tab-1" />
          <Tab label="Subtasks" id="simple-tab-2" />
        </Tabs>
        <DialogContent>
          <General
            todo={todo}
            tabIndex={0}
            tab={tab}
            handleChange={handleChange}
          />
          <Sharing tabIndex={1} tab={tab} />
          <Subtasks tabIndex={2} tab={tab} />
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

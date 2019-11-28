import React, { ChangeEvent } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../reducers/rootReducer';
import { hideDoneAction } from '../todo/actions/todo.actions';

const Done: React.FC = () => {
  const dispatch = useDispatch();
  const hideDone = useSelector((state: AppState) => state.todo.hideDone);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(hideDoneAction(e.currentTarget.checked));
  }
  return (
    <FormControlLabel
      control={
        <Switch
          checked={hideDone}
          onChange={handleChange}
          value={true}
          name="done"
        />
      }
      label="Erledigte verstecken"
    />
  );
};
export default Done;

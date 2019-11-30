import React, { ChangeEvent } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../reducers/rootReducer';
import { showOnlyStarsAction } from '../todo/actions/todo.actions';

const ShowOnlyStars: React.FC = () => {
  const dispatch = useDispatch();
  const showOnlyStars = useSelector(
    (state: AppState) => state.todo.showOnlyStars
  );
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    dispatch(showOnlyStarsAction(e.currentTarget.checked));
  }
  return (
    <FormControlLabel
      control={
        <Switch
          checked={showOnlyStars}
          onChange={handleChange}
          value={true}
          name="stars"
        />
      }
      label="Nur Sterne"
    />
  );
};
export default ShowOnlyStars;

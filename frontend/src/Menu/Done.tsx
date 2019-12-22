import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';

interface Props {
  hideDone: boolean;
  onChange: (hideDone: boolean) => void;
}

const Done: React.FC<Props> = ({ hideDone, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={hideDone}
          onChange={() => onChange(!hideDone)}
          value={true}
          name="done"
        />
      }
      label="Erledigte verstecken"
    />
  );
};
export default Done;

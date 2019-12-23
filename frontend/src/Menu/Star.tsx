import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';

interface Props {
  onlyStars: boolean;
  onChange: (onlyStars: boolean) => void;
}

const ShowOnlyStars: React.FC<Props> = ({ onlyStars, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={onlyStars}
          onChange={() => onChange(!onlyStars)}
          value={true}
          name="stars"
        />
      }
      label="Nur Sterne"
    />
  );
};
export default ShowOnlyStars;

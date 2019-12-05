import React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  tabIndex: number;
  tab: number;
}

const Sharing: React.FC<Props> = ({ tab, tabIndex }) => {
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={tab !== tabIndex}
      id={`simple-tabpanel-${tabIndex}`}
      aria-labelledby={`simple-tab-${tabIndex}`}
    >
      Sharing
    </Typography>
  );
};

export default Sharing;

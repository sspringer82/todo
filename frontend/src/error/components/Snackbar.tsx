import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Alert from '@material-ui/lab/Alert';

import { Snackbar as MUISnackbar } from '@material-ui/core';
import { getCurrentError } from '../selectors/error.selector';
import { activateErrorAction } from '../actions/error.actions';

const Snackbar: React.FC = () => {
  const currentError = useSelector(getCurrentError);
  const [open, setOpen] = useState(!!currentError);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(activateErrorAction());
    setOpen(false);
  }, [dispatch]);

  useEffect(() => {
    if (!!currentError) {
      setOpen(true);
      setTimeout(() => handleClose(), 2000);
    }
  }, [currentError, handleClose]);

  return (
    <MUISnackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={handleClose}
    >
      <Alert severity="error" variant="filled">
        {currentError}
      </Alert>
    </MUISnackbar>
  );
};

export default Snackbar;
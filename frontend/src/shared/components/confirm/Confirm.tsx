import React, { useEffect, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';

interface Props {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Confirm: React.FC<Props> = ({
  title,
  content,
  open,
  onConfirm,
  onCancel,
}) => {
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => {
      button.current && button.current!.focus();
    }, 0);
  }, [open]);

  return (
    <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="primary" ref={button}>
          OK
        </Button>
        <Button onClick={onCancel} color="secondary">
          Abbrechen
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;

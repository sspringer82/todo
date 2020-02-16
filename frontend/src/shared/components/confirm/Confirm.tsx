import React from 'react';
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
}) => (
  <Dialog open={open}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>{content}</DialogContent>
    <DialogActions>
      <Button onClick={onConfirm}>OK</Button>
      <Button onClick={onCancel}>Abbrechen</Button>
    </DialogActions>
  </Dialog>
);

export default Confirm;

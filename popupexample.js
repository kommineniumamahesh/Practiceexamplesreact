import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

const Modal = ({ isOpen, handleClose, data }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Modal Title</DialogTitle>
      <DialogContent>
        {/* Render your content and use the passed data */}
        <p>{data}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;

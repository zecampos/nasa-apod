import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function TheModal({ setModal, modal, pic }) {
  const handleClose = () => {
    setModal(false);
  };

  return (
    <div>
      <Dialog
        open={modal}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="responsive-dialog-title">
          {pic.title} - {pic.dateBr}
        </DialogTitle>
        <DialogContent>
          <img
            style={{
              maxHeight: 500,
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
              objectFit: "contain",
            }}
            src={pic.url}
            alt={pic.title}
          />
          <DialogContentText align="center">
            Autor: {pic.copyright}
          </DialogContentText>
          <DialogContentText>{pic.explanation}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

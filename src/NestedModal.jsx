import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export function ChildModal(props) {
  const [open, setOpen] = React.useState(false);
  const [bugEdit, setBugEdit] = React.useState(props.bug)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const saveHandler = () =>{
    props.onSave(bugEdit)
    handleClose();
  }

  const changeHandler = (value, id)=>{
     setBugEdit(prevBug =>{
         return {
             ...prevBug, [id] : value
         }})

 };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description">
        <Box sx={{ ...style, width: 400, bgcolor: "#2b478f" }} >
        <TextField
            autoFocus
            margin="dense"
            onChange={e => changeHandler(e.target.value, props.id)}
            defaultValue={props.defaultValue}
            rows={8}
            multiline
            type="text"
            fullWidth
            variant="standard"
          />
          <Button onClick={saveHandler}>Save</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  );
}
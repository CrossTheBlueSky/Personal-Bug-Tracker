import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ProjectDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [newProject, setNewProject] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler = (event)=>{
   //const name = event.target.id;
   const value = event.target.value;
   
    setNewProject(value);
  };

  const handleAdd = (event) =>{
    setOpen(false);
    props.onAdd(newProject);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Project
      </Button>
      <Dialog open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': {bgcolor: "#2b478f"}}}>
        <DialogTitle>Adding Project</DialogTitle>
        <DialogContent>
          <TextField
            onChange={changeHandler}
            autoFocus
            margin="dense"
            id="name"
            label="Name the Project"
            type="text"
            fullWidth
            variant="standard"
          />
          {/* <input type="color" 
          id="color"
          onChange={changeHandler}/>
          <p style={{fontSize:".75rem", color:"grey"}}>Choose a unique color <br />to identify the project</p> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add Project</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
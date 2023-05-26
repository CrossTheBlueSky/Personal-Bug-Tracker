import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [newBug, setNewBug] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const changeHandler = (event)=>{
   let name = event.target.id;
   let value = event.target.value;   


    setNewBug(prevBug =>{
        return {
            ...prevBug, [name] : value
        }})
};

  const handleAdd = (event) =>{
    setOpen(false);
    props.onAdd(newBug);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Bug
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adding Bug</DialogTitle>
        <DialogContent>
          <TextField
            onChange={changeHandler}
            autoFocus
            margin="dense"
            id="name"
            label="Give the Bug A Name"
            type="text"
            fullWidth
            variant="standard"
          />
        <select onChange={changeHandler} id="project">
            <option>Project</option>
            {props.projects.map((element) =>{
              return(
                <option value={element}>{element}</option>
              )
            })}
          </select>
          <select onChange={changeHandler} id="severity">
            <option>Severity</option>
            <option value="Trivial" style={{color:'cyan'}}>Trivial</option>
            <option value="Minor" style={{color:'yellow'}}>Minor</option>
            <option value="Moderate" style={{color:'darkorange'}}>Moderate</option>
            <option value="Severe" style={{color:'red'}}>Severe</option>
          </select>
          <TextField
            onChange={changeHandler}
            autoFocus
            margin="dense"
            id="description"
            label="Description of the Bug"
            rows={4}
            multiline
            type="text"
            fullWidth
            variant="standard"
          />
                    <TextField
                    onChange={changeHandler}
            autoFocus
            margin="dense"
            id="reproduce"
            label="How to Reproduce the bug"
            rows={8}
            multiline
            type="text"
            fullWidth
            variant="standard"
          />
                              <TextField
                    onChange={changeHandler}
            autoFocus
            margin="dense"
            id="tags"
            label="keywords to help search this bug later"
            rows={1}
            multiline
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add Bug</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
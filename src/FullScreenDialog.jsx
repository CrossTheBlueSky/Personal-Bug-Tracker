import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {ChildModal} from "./NestedModal"
import "./index.css"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function FullScreenDialog(props) {

  const title = props.bug.name.toString()
  const [editBug, setEditBug] = React.useState(props.bug)

  function handleSave(bug){
    setEditBug(bug)
  }

  function finalize(){
    
    props.onEdit(editBug)
    closer()
  }

function deleteBug(){
  props.onDelete(props.bug)
  closer()
}

function testCheck(){
  console.log(props.bug)
}

const closer = props.handleClose;

  return (



    <div>
      <Dialog sx={{ '& .MuiPaper-root': {bgcolor: "#04102b"}}}
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative'}}>
          <Toolbar sx={{bgcolor: "#0b235d", mr:"-1rem"}}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2}} variant="h6" component="div" >
              {title}
            </Typography>
            <ChildModal onSave ={handleSave} bug = {editBug} id= "name" sx={{flex: 2}}/>
            <Button autoFocus variant="outlined" color="inherit" onClick={deleteBug} sx={{ml:"auto", mr:"5px"}}>
              delete
            </Button>
            <Button autoFocus variant="outlined" color="inherit" onClick={finalize}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{color: 'darkslategrey', '& .MuiListItemText-secondary': {color: 'lightslategray'}}}>
          <ListItem button onClick={testCheck}>
            <ListItemText primary="Severity" secondary={editBug.severity} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Description"
              secondary={editBug.description}
            />
                        <ChildModal id="description" onSave ={handleSave} bug = {editBug} defaultValue = {editBug.description} sx={{ml:"auto"}} />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="How to Reproduce"
              secondary={editBug.reproduce}
            />
                        <ChildModal id="reproduce" onSave ={handleSave} bug = {editBug} defaultValue = {editBug.reproduce} sx={{ml:"auto"}} />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Notes"
              secondary={editBug.notes}
            />
                        <ChildModal id="notes" onSave ={handleSave} bug = {editBug} defaultValue = {editBug.notes} sx={{ml:"auto"}} />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Tags"
              secondary={editBug.tags}
            />
                        <ChildModal id="tags" onSave ={handleSave} bug = {editBug} defaultValue = {editBug.tags} sx={{ml:"auto"}} />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
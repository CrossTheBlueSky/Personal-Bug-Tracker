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
import "./index.css"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function FullScreenDialog(props) {

  const title = props.bug.name.toString()

  return (

    <div >
      <Dialog sx={{ '& .MuiPaper-root': {bgcolor: "#04102b"}}}
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{bgcolor: "#0b235d"}}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" >
              {title}
            </Typography>
            <Button autoFocus color="inherit" onClick={props.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{color: 'darkslategrey', '& .MuiListItemText-secondary': {color: 'lightslategray'}}}>
          <ListItem button>
            <ListItemText primary="Severity" secondary={props.bug.severity} />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemText
              primary="Description"
              secondary={props.bug.description}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="How to Reproduce"
              secondary={props.bug.reproduce}
            />
          </ListItem>
          <ListItem button>
            <ListItemText
              primary="Tags"
              secondary={props.bug.tags}
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}
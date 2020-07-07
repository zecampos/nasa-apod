import React from "react";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CancelIcon from "@material-ui/icons/Cancel";

import { useHistory } from "react-router-dom";
const drawerWidth = "100%";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function DrawerFilter({ open, setOpen }) {
  const classes = useStyles();

  const history = useHistory();
  function handleNavigation(route) {
    history.push(route);
    setOpen(false);
  }
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={() => setOpen(false)}>
          <CancelIcon />
          {/* {theme.direction === "rtl" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )} */}
        </IconButton>
      </div>
      <Divider />
      <List style={{ marginTop: 10 }}>
        <Divider />
        <ListItem onClick={() => handleNavigation("/")} button>
          <ListItemText style={{ textAlign: "center" }} primary="Home" />
        </ListItem>
        <Divider />
        <ListItem onClick={() => handleNavigation("/favoritos")} button>
          <ListItemText style={{ textAlign: "center" }} primary="Favoritos" />
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  );
}

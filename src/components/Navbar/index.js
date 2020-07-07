import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";

import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MenuIcon from "@material-ui/icons/Menu";

import Logo from "../../assets/logo.png";
import TheDrawer from "../TheDrawer";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#EFE8E5",
    paddingLeft: 20,
    paddingRight: 20,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    maxHeight: 40,
    marginRight: 10,
  },
  button: {
    color: "#006572",
    fontFamily: "RedHatDisplay-Regular",
    fontSize: 14,
    textTransform: "capitalize",
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const history = useHistory();
  const matches = useMediaQuery("(max-width:920px)");
  const [drawer, setDrawer] = React.useState(false);
  return (
    <div className={classes.root}>
      <AppBar elevation={0} className={classes.appBar} position="static">
        <Toolbar>
          {matches ? (
            <div
              style={{
                display: "flex",
                width: "100%",
                alignContent: "space-between",
                justifyContent: "space-between",
              }}
            >
              <img className={classes.logo} alt="logo Nasa" src={Logo} />
              <IconButton
                onClick={() => setDrawer(true)}
                color="primary"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </div>
          ) : (
            <>
              <img className={classes.logo} alt="logo Nasa" src={Logo} />

              <Button
                onClick={() => history.push("/")}
                className={classes.button}
              >
                Home
              </Button>
              <Button
                onClick={() => history.push("/favoritos")}
                className={classes.button}
              >
                Favoritos
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <TheDrawer open={drawer} setOpen={setDrawer} />
    </div>
  );
}

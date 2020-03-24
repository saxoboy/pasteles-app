import React, { useContext } from "react";
import Link from "../Link";
import { FirebaseContext } from "../../firebase/";

/* MUI */
import { fade, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(1, 0)
  },
  navigation: {
    "& hr": {
      margin: theme.spacing(0, 1.5)
    }
  },
  toolbarLink: {
    //padding: theme.spacing(1),
    flexShrink: 0,
    padding: theme.spacing(1.5),
    backgroundColor: "#5768a5",
    margin: theme.spacing(0, 0.5),
    borderRadius: 5,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      textDecoration: "none"
    },
    "& hr": {
      margin: theme.spacing(0, 0.5)
    }
  },
  toolBarNoButon: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1),
    backgroundColor: "#981d1d",
    color: "#ffffff",
    borderRadius: 5,
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.15),
      textDecoration: "none"
    }
  }
}));

const Navigation = () => {
  const classes = useStyles();
  const { usuario, firebase } = useContext(FirebaseContext);
  return (
    <>
      <nav className={classes.root}>
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className={classes.navigation}
        >
          <Link
            color="inherit"
            href="/"
            noWrap
            variant="body2"
            className={classes.toolbarLink}
          >
            Home
          </Link>
          <Link
            color="inherit"
            href="/about"
            noWrap
            variant="body2"
            className={classes.toolbarLink}
          >
            About
          </Link>
          <Link
            color="inherit"
            href="/contact"
            noWrap
            variant="body2"
            className={classes.toolbarLink}
          >
            Contact
          </Link>
          <Divider orientation="vertical" flexItem />
          {usuario ? (
            <>
              <span>Hola {usuario.displayName}</span>
              <Link
                color="inherit"
                href="/nuevo-pastel"
                noWrap
                variant="body2"
                className={classes.toolbarLink}
              >
                Nuevo
              </Link>
              <Link
                color="inherit"
                href="/login"
                noWrap
                variant="body2"
                className={classes.toolBarNoButon}
                onClick={() => firebase.cerrarSesion()}
              >
                Cerrar Sesión
              </Link>
            </>
          ) : (
            <>
              <Link
                color="inherit"
                href="/login"
                noWrap
                variant="body2"
                className={classes.toolbarLink}
              >
                Login
              </Link>
              <Link
                color="inherit"
                href="/registrar"
                noWrap
                variant="body2"
                className={classes.toolbarLink}
              >
                Registrase
              </Link>
            </>
          )}
        </Grid>
      </nav>
    </>
  );
};

export default Navigation;

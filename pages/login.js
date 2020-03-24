import React, { useState } from "react";
import Router from "next/router";
import Layout from "../layout/Layout";
import { useForm } from "../hooks/useForm";
import validarLogin from "../utils/validarLogin";

import firebase from "../firebase";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

const initialState = {
  email: "",
  password: ""
};

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const Login = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true); //para el error
  const [error, setError] = useState(false); //para el crear usuario
  const { onChange, onSubmit, values, errores } = useForm(
    iniciarSesion,
    initialState,
    validarLogin
  );
  const { email, password } = values;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      console.log("Existe un error en el Login", error.message);
      setError(error.message);
    }
  }

  return (
    <Layout>
      <Typography variant="h4" component="h1" align="center">
        Iniciar Sesión
      </Typography>
      <Container maxWidth="sm">
        {Object.keys(errores).length > 0 && (
          <Collapse in={open}>
            <Alert
              severity="error"
              variant="filled"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              <ul>
                {Object.values(errores).map(value => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </Alert>
          </Collapse>
        )}
        {error && (
          <Collapse in={open}>
            <Alert
              severity="error"
              variant="filled"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error}
            </Alert>
          </Collapse>
        )}
        <form
          onSubmit={onSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            value={values.email}
            onChange={onChange}
            margin="normal"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            size="small"
            required
            fullWidth
            autoFocus
          />
          <TextField
            value={values.password}
            onChange={onChange}
            margin="normal"
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            size="small"
            required
            fullWidth
          />
          <Button
            style={{ margin: "1.5em 0" }}
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            endIcon={<SendIcon />}
          >
            Iniciar Sesión
          </Button>
        </form>
      </Container>
    </Layout>
  );
};

export default Login;

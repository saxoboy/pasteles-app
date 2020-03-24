import React, { useState, useContext } from "react";
import Router from "next/router";
import Layout from "../layout/Layout";
import { useForm } from "../hooks/useForm";
import validarProducto from "../utils/validarProducto";

import { FirebaseContext } from "../firebase";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import Alert from "@material-ui/lab/Alert";

//iniciando State
const initialState = {
  nombre: "",
  descripcion: "",
  slug: "",
  categorias: []
};

//Categorias
const opcionesCategorias = [
  { nombre: "Cumpleaños" },
  { nombre: "Bodas" },
  { nombre: "Quinceañeras" },
  { nombre: "Bautizos" },
  { nombre: "Niños" }
];

//Classes de MUI
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2, 0, 1, 0),
    minWidth: 300
  }
}));

//Función Main
const NuevoProducto = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true); //para el error
  const [error, setError] = useState(false); //para el crear usuario

  // Manejo del form // Validación // Errores
  const { onChange, onSelect, onSubmit, values, errores } = useForm(
    crearProducto,
    initialState,
    validarProducto
  );

  // Valores a desfragmentar
  const { nombre, descripcion, slug, categorias } = values;

  // context con las operaciones crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);

  //Función Secundaria
  async function crearProducto() {
    // si el usuario no esta autenticado es llevado al login
    if (!usuario) {
      alert("ups.. necesitas estar antes logeado")
      return Router.push("/login");
    }
    // ingresamos la info
    try {
      console.log(values);
    } catch (error) {
      console.log("Existe un error", error.message);
    }
  }

  return (
    <Layout>
      <Typography variant="h4" component="h1" align="center">
        Crear Nuevo Producto
      </Typography>
      <Container py={2}>
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
        <form
          onSubmit={onSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                value={nombre}
                onChange={onChange}
                id="nombre"
                name="nombre"
                label="Nombre Producto"
                margin="normal"
                autoComplete="nombre"
                variant="outlined"
                required
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={slug}
                onChange={onChange}
                id="slug"
                name="slug"
                label="Slug"
                margin="normal"
                placeholder="ej: pastel-sirenita"
                variant="outlined"
                autoComplete="slug"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                className={classes.formControl}
                options={opcionesCategorias}
                getOptionLabel={option => option.nombre}
                filterSelectedOptions
                renderInput={params => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Categorias"
                    placeholder="Categorias"
                  />
                )}
                onChange={onSelect}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="descripcion"
                name="descripcion"
                label="Descripcion"
                rows="4"
                variant="outlined"
                value={descripcion}
                onChange={onChange}
                required
                multiline
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{ margin: "1.5em 0" }}
                type="submit"
                variant="contained"
                color="primary"
                size="small"
                endIcon={<SendIcon />}
              >
                Crear Producto
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  );
};

export default NuevoProducto;

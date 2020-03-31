import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import FileUploader from "react-firebase-file-uploader";
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
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardMedia from "@material-ui/core/CardMedia";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import CancelIcon from "@material-ui/icons/Cancel";
import Alert from "@material-ui/lab/Alert";
import Autocomplete from "@material-ui/lab/Autocomplete";

//iniciando State
const initialState = {
  nombre: "",
  descripcion: "",
  slug: "",
  imagen: "",
  categorias: []
};
//Categorias
const opcionesCategorias = [
  { nombre: "Cumpleaños" },
  { nombre: "Niños" },
  { nombre: "Niñas" },
  { nombre: "Bodas" },
  { nombre: "Quinceañeras" },
  { nombre: "Bautizos" }
];
//Classes de MUI
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2, 0, 1, 0),
    minWidth: 300
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  }
}));
//Función Main
const NuevoProducto = () => {
  const { usuario, firebase } = useContext(FirebaseContext); // context con las operaciones crud de firebase
  const router = useRouter(); //hook del Router para redireccionar
  const classes = useStyles(); // para los estilos
  const [open, setOpen] = useState(true); //para abrir y cerrar el error de validación
  const [error, setError] = useState(true); //para el error en el crear producto

  // state de las imagenes
  const [nombreimagen, guardarNombre] = useState(""); //nombre de la imagen
  const [subiendo, guardarSubiendo] = useState(false); //
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlImagen] = useState("");
  
  // Manejo del form // Validación // Errores
  const { onChange, onSelect, onSubmit, values, errores } = useForm( crearProducto, initialState, validarProducto );

  // Valores a desfragmentar
  const { nombre, descripcion, slug, categorias } = values;

  //Función Secundaria
  async function crearProducto() {
    // si el usuario no esta autenticado es llevado al login
    if (!usuario) {
      alert("ups.. necesitas estar antes logeado");
      return router.push("/login");
    }
    // si no existe un error, ingresamos los datos
    if (!error) {
      console.log("si hay error? " + error);
      setError(false);
      //creamos el producto
      const producto = {
        nombre,
        descripcion,
        slug,
        urlimagen,
        categorias,
        votos: 0,
        comentarios: [],
        creado: Date.now(),
        creador: {
          id: usuario.uid,
          nombre: usuario.displayName
        }
      };
      console.log("datos del producto es: " + producto);
      // insertarlo en la base de datos
      await firebase.db
        .collection("productos")
        .add(producto)
        .then(ref => {
          console.log("Documento ingresado con el ID: ", ref.id);
        });
      //Redirigiendo al index
      //return router.push("/");
    } else {
      console.log("Existe un error de validación");
      return router.push("/nuevo-pastel");
    }
  }

  const handleUploadStart = () => {
    guardarSubiendo(true);
    guardarProgreso(0);
  };

  const handleProgress = progreso => {
    guardarProgreso({ progreso });
  };

  const handleUploadError = error => {
    guardarSubiendo(error);
    console.error(error);
  };

  const handleUploadSuccess = nombre => {
    guardarNombre(nombre);
    guardarProgreso(100);
    guardarSubiendo(false);
    firebase.storage
      .ref("productos")
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        guardarUrlImagen(url);
      });
  };

  //cancelar todo
  const cancelAll = url => {
    console.log(url);
    // var desertRef = storageRef.child(url);
    // firebase.storage.ref("productos")
    // // Delete the file
    // desertRef
    //   .delete()
    //   .then(function() {
    //     // File deleted successfully
    //   })
    //   .catch(function(error) {
    //     // Uh-oh, an error occurred!
    //   });
  };

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
            <Grid item xs={12} sm={6}>
              <FileUploader
                accept="image/*"
                id="imagen"
                name="imagen"
                randomizeFilename
                storageRef={firebase.storage.ref("productos")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSuccess}
                onProgress={handleProgress}
              />
              {progreso && <CircularProgress color="secondary" />}
            </Grid>
            <Grid item xs={12} sm={6}>
              {urlimagen && (
                <>
                  <CardMedia
                    className={classes.media}
                    image={urlimagen}
                    title={nombreimagen}
                  />
                  <Button
                    style={{ margin: "1.5em 0" }}
                    variant="contained"
                    size="small"
                    color="default"
                    endIcon={<CancelIcon />}
                    onClick={cancelAll(urlimagen)}
                  >
                    Cancelar
                  </Button>
                </>
              )}
            </Grid>
            <Grid item xs={12} container justify="center" alignContent="center">
              <ButtonGroup aria-label="contained button group">                
                <Button
                  style={{ margin: "1.5em 0" }}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="small"
                  endIcon={<SendIcon />}
                >
                  Crear Producto
                </Button>
                <Button
                  style={{ margin: "1.5em 0" }}
                  variant="contained"
                  size="small"
                  color="default"
                  endIcon={<CancelIcon />}
                  onClick={() => router.push("/")}
                >
                  Cancelar
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Layout>
  );
};

export default NuevoProducto;

//<LinearProgress variant="determinate" value={progreso} color="secondary" />

import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import validarProducto from "../../utils/validarProducto";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const initialState = {
  nombre: "",
  descripcion: "",
  slug: "",
  categoria: ""
};

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(2, 0, 1, 0),
    minWidth: 300
  },
  inputLabel: {
    margin: theme.spacing(-0.5, 0, 0, 2)
  }
}));

const Info = () => {
  const classes = useStyles();
  const [categoria, setCategoria] = useState("");
  const handleChange = event => {
    setCategoria(event.target.value);
  };

  const { onChange, onSubmit, values, errores } = useForm(
    crearProducto,
    initialState,
    validarProducto
  );

  const { nombre, descripcion, slug } = values;

  async function crearProducto() {
    try {
        console.log("funca??");
    } catch (error) {
      console.log("Existe un error", error.message);
    }
  }

  return (
    <>
      <Typography variant="h6" align="center" gutterBottom>
        Información del Producto
      </Typography>
      <form
        onSubmit={onSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4}>
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
          <Grid item xs={12} sm={6} lg={4}>
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
          <Grid item xs={12} sm={6} lg={4}>
            <FormControl className={classes.formControl}>
              <InputLabel id="label-categoria" className={classes.inputLabel}>
                Categoria
              </InputLabel>
              <Select
                labelId="label-categoria"
                id="categoria"
                variant="outlined"
                value={categoria}
                onChange={handleChange}
              >
                <MenuItem value={10}>Cumpleaños Niño</MenuItem>
                <MenuItem value={20}>Boda</MenuItem>
                <MenuItem value={30}>Bautizos</MenuItem>
              </Select>
            </FormControl>
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
        </Grid>
      </form>
    </>
  );
};
export default Info;

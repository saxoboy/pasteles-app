import React, { useState } from "react";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloudUpload from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  input: {
    display: "none"
  },
  iconCloud: {
    width: "10rem",
    height: "10rem"
  }
}));

const ImagenProduct = () => {
  const classes = useStyles();
  const [selectFile, setSelectFile] = useState(null)
  const imagenSelect = event => {
    console.log(event.target.file[0]);
  };
  const imagenSubida = () => {
      
  }
  return (
    <div>
      <Typography variant="h6" align="center" gutterBottom>
        Imagenes de Producto
      </Typography>
      <input
        accept="image/*"
        className={classes.input}
        id="button-file"
        multiple
        type="file"
        onChange={imagenSelect}
      />
      <label htmlFor="button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={classes.iconCloud}
        >
          <CloudUpload />
        </Button>
      </label>
    </div>
  );
};

export default ImagenProduct;

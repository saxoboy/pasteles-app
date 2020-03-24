import React, { useState } from "react";
import Router from "next/router";
import Layout from "../layout/Layout";
import { useForm } from "../hooks/useForm";
//import validarLogin from "../utils/validarproducto";

import firebase from "../firebase";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

/* Nuevos Productos*/
import Info from "../layout/nuevoProducto/info";
import Imagen from "../layout/nuevoProducto/imagen";

const steps = ["Info Producto", "Imagen"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Info />;
    case 1:
      return <Imagen />;
    // case 2:
    //   return <Info />;
    default:
      throw new Error("Unknown step");
  }
}
const initialState = {
  nombre: "",
  descripcion: "",
  slug: "",
  imagen: "",
  categoria: ""
};

const useStyles = makeStyles(theme => ({
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const NuevoProducto = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {setActiveStep(activeStep + 1)};
  const handleBack = () => {setActiveStep(activeStep - 1)};

  return (
    <Layout>
      <Typography variant="h4" component="h1" align="center">
        Crear Nuevo Registro
      </Typography>
      <Container>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} className={classes.button}>
                    Atrás
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Crear Pastel" : "Siguiente"}
                </Button>
              </div>
            </>
          )}
        </>
      </Container>
    </Layout>
  );
};

export default NuevoProducto;

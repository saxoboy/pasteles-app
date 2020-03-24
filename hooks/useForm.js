import { useState, useEffect } from "react";

export const useForm = (callback, initialState, validar = {}) => {
  const [values, setValues] = useState(initialState);
  const [errores, setErrores] = useState({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;
      if (noErrores) {
        callback(); // Fn = Función que se ejecuta en el componente
      }
      setSubmitForm(false);
    }
  }, [errores]);

  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSelect = (event, select) => {
    setValues({ ...values, categorias:select });
  };

  const onSubmit = event => {
    event.preventDefault();
    const erroresValidacion = validar(values);
    setErrores(erroresValidacion);
    callback();
  };

  return {
    onChange,
    onSelect,
    onSubmit,
    values,
    errores
  };
};

export default function validarProducto(valores) {
  let errores = {};

  // Validar el nombre del usuario
  if (!valores.nombre) {
    errores.nombre = "Nombre del Producto es obligatorio";
  }
  // Validar el nombre del usuario
  if (!valores.slug) {
    errores.slug = "Slug es obligatorio";
  }
  // Validar el nombre del usuario
  if (!valores.descripcion) {
    errores.descripcion = "Descripción es obligatorio";
  }
  return errores;
}
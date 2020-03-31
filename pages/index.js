import React from "react";
import Layout from "../layout/Layout";
import useProductos from "../hooks/useProductos";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const Index = () => {
  const { productos } = useProductos("creado");

  return (
    <div>
      <Layout>
        <Typography variant="h4" component="h1" align="center">
          Productos
        </Typography>
        <div>
          <div>
            <ul className="bg-white">
              {productos.map(producto => ({
                /* <DetallesProducto key={producto.id} producto={producto} /> */
              }))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default Index;

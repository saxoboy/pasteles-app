import React, { useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import firebase, { FirebaseContext } from "../firebase";
import useAutenticacion from "../hooks/useAutenticacion";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";

const MyApp = props => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const usuario = useAutenticacion();
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Pasteles App</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <FirebaseContext.Provider value={{ firebase, usuario }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </FirebaseContext.Provider>
    </>
  );
};
export default MyApp;

// export default class MyApp extends App {
//   componentDidMount() {
//     // Remove the server-side injected CSS.
//     const jssStyles = document.querySelector("#jss-server-side");
//     if (jssStyles) {
//       jssStyles.parentElement.removeChild(jssStyles);
//     }
//   }

//   render() {
//     const usuario = useAutenticacion();
//     const { Component, pageProps } = this.props;

//     return (
//       <>
//         <Head>
//           <title>Pasteles App</title>
//           <meta
//             name="viewport"
//             content="minimum-scale=1, initial-scale=1, width=device-width"
//           />
//         </Head>
//         <FirebaseContext.Provider value={{ firebase, usuario }}>
//           <ThemeProvider theme={theme}>
//             <CssBaseline />
//             <Component {...pageProps} />
//           </ThemeProvider>
//         </FirebaseContext.Provider>
//       </>
//     );
//   }
// }

import React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

/*NUI*/
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";

const Layout = props => {
  return (
    <>
      <Header />
      <main>
        <Box py={4}>
          <Container>{props.children}</Container>
        </Box>
      </main>
      <Footer />
    </>
  );
};

export default Layout;

import React from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

/*NUI*/
import Container from "@material-ui/core/Container";

const Layout = props => {
  return (
    <>
      <Header />
      <main>
        <Container>{props.children}</Container>
      </main>
      <Footer />
    </>
  );
};

export default Layout;

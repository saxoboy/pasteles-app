import React from "react";
import Navigation from "./Navigation";
import Buscador from "./Buscador";

/*MUI*/
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#c464ab",
  },
  logo: {}
}));

const Header = () => {
  const classes = useStyles();
  return (
    <header>
      <Box className={classes.root} py={1}>
        <Container>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={3}>
              <Typography
                className={classes.logo}
                variant="h5"
                component="h1"
                gutterBottom
              >
                <img src="../static/img/Deliza.png" width="200" />
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Buscador />
            </Grid>
            <Grid item xs={7}>
              <Navigation />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </header>
  );
};

export default Header;

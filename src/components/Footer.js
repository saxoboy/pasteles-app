import React from "react";

/*MUI*/
import Typography from "@material-ui/core/Typography"
import MuiLink from '@material-ui/core/Link';

const Footer = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "} {new Date().getFullYear()}{" "}
      <MuiLink color="inherit" href="http://localhost:3000/">
        Israel Herrera E. en el pie
      </MuiLink>
    </Typography>
  );
};

export default Footer;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

export const Topbar: React.FC = () => {
  const classes = useStyles();

  return (
    <Box marginBottom={4}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" align="center" className={classes.title}>
            RepoRadar
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

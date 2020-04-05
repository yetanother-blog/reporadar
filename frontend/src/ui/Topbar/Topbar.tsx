import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Box } from "@material-ui/core";

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

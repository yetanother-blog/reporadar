import React from "react";
import { Grid } from "@material-ui/core";

export const RepoCardList: React.FC = ({ children }) => {
  return (
    <Grid container direction="column" spacing={3}>
      {React.Children.map(children, (child) => (
        <Grid item>{child}</Grid>
      ))}
    </Grid>
  );
};

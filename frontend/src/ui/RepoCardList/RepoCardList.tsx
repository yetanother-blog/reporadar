import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import moment from "moment";

export interface RepoCardListProps {
  time: string;
}

export const RepoCardList: React.FC<RepoCardListProps> = ({
  children,
  time
}) => {
  return (
    <Box marginBottom={4}>
      <Typography variant="h4" gutterBottom>
        {moment(time, "YYYYMMDD").fromNow()}
      </Typography>
      <Grid container direction="column" spacing={3}>
        {React.Children.map(children, child => (
          <Grid item>{child}</Grid>
        ))}
      </Grid>
    </Box>
  );
};

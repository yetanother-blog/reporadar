import React from "react";
import { Grid, Box, Typography } from "@material-ui/core";
import moment from "moment";
import { Skeleton } from "@material-ui/lab";

export interface RepoCardListProps {
  time: string;
  isLoading?: boolean;
}

export const RepoCardList: React.FC<RepoCardListProps> = ({
  children,
  time,
  isLoading
}) => {
  return (
    <Box marginBottom={4}>
      <Typography variant="h4" gutterBottom>
        {isLoading ? (
          <Skeleton variant="text" animation="wave" />
        ) : (
          moment(time, "YYYYMMDD").fromNow()
        )}
      </Typography>
      <Grid container direction="column" spacing={3}>
        {React.Children.map(children, child => (
          <Grid item>{child}</Grid>
        ))}
      </Grid>
    </Box>
  );
};

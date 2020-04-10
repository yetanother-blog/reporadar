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
  const isToday = moment(time).isSame(Date.now(), "day");
  const label = isToday ? "Today" : moment(time, "YYYYMMDD").fromNow();

  return (
    <Box marginBottom={4}>
      <Box marginBottom={2}>
        <Typography variant="h4">
          {isLoading ? <Skeleton variant="text" animation="wave" /> : label}
        </Typography>
      </Box>
      <Grid container direction="column" spacing={3}>
        {React.Children.map(children, child => (
          <Grid item>{child}</Grid>
        ))}
      </Grid>
    </Box>
  );
};

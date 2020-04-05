import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export interface RepoCardProps {
  name: string;
  description: string;
  url: string;
  stars: number;
  loading?: boolean;
}

export const RepoCard: React.FC<RepoCardProps> = ({
  stars,
  name,
  description,
  url,
  loading = false,
}) => {
  return (
    <Card>
      <CardContent>
        <Box marginBottom={2}>
          <Typography variant="h5" component="h2">
            {loading ? <Skeleton variant="text" /> : name}
          </Typography>
          <Typography color="textSecondary">
            {loading ? <Skeleton variant="text" /> : `${stars} stars`}
          </Typography>
        </Box>
        <Typography variant="body2" component="p">
          {loading ? <Skeleton variant="text" /> : description}
        </Typography>
      </CardContent>
      <CardActions>
        {loading ? (
          <Skeleton variant="rect" width={100} height={30} />
        ) : (
          <Button color="primary" size="small" href={url} target="_blank">
            GitHub
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { CssBaseline } from '@material-ui/core';
import { client } from "./utils/apollo";
import { RepoList } from "./containers/RepoList/RepoList";

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <>
        <CssBaseline />
        <RepoList />
      </>
    </ApolloProvider>
  );
};

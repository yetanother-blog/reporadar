import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { CssBaseline, Container } from "@material-ui/core";
import { client } from "./utils/apollo";
import { RepoList } from "./containers/RepoList/RepoList";
import { Topbar } from "./ui/Topbar/Topbar";

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <>
        <CssBaseline />
        <Topbar />
        <Container maxWidth="md">
          <RepoList />
        </Container>
      </>
    </ApolloProvider>
  );
};

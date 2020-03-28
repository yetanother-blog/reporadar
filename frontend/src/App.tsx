import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from "./utils/apollo";
import { RepoList } from "./containers/RepoList/RepoList";

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <RepoList />
    </ApolloProvider>
  );
};

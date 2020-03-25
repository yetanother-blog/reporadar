import { GraphQLClient } from "graphql-request";
import { GitHubClient } from "../clients/GitHubClient";

export function createGitHubClient(accessToken: string) {
  const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
      authorization: `bearer ${accessToken}`
    }
  });

  return new GitHubClient(graphQLClient);
}

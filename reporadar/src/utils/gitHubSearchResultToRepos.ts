import { SearchResponse } from "../clients/GitHubClient";

export function gitHubSearchResultToRepos(searchResult: SearchResponse) {
  return searchResult.search.edges.map(result => ({
    id: result.node.nameWithOwner,
    description: result.node.description,
    url: result.node.url
  }));
}

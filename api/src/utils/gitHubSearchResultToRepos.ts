import { SearchResponse } from "../clients/GitHubClient";
import { Repo } from "../repositories/RepoRepository";

export function gitHubSearchResultToRepos(
  searchResult: SearchResponse
): Repo[] {
  return searchResult.search.edges.map((result) => ({
    id: result.node.nameWithOwner,
    description: result.node.description,
    url: result.node.url,
    numberOfStars: result.node.stargazers.totalCount,
    indexedAt: new Date().toISOString(),
  }));
}

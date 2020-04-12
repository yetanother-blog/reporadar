import { SearchResponse } from "../clients/GitHubClient";
import { Repo } from "../repositories/RepoRepository";

export function gitHubSearchResultToRepos(
  searchResult: SearchResponse
): Repo[] {
  return searchResult.search.nodes.map((result) => {
    const r: Repo = {
      id: result.nameWithOwner,
      description: result.description,
      url: result.url,
      numberOfStars: result.stargazers.totalCount,
      forkCount: result.forkCount,
      topics: result.repositoryTopics.nodes.map((node) => node.topic.name),
      indexedAt: new Date().toISOString(),
      type: "REPO",
      source: "GITHUB",
    };

    if (result.homepageUrl) {
      r.homepageUrl = result.homepageUrl;
    }

    if (result.primaryLanguage) {
      r.language = result.primaryLanguage.name;
    }

    return r;
  });
}

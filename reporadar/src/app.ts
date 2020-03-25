import { guardValue } from "./utils/guardValue";
import { createGitHubClient } from "./factories/createGitHubClient";
import { createRepoRepository } from "./factories/createRepoRepository";
import { gitHubSearchResultToRepos } from "./utils/gitHubSearchResultToRepos";

interface Event {
  query: string;
  limit: number;
}

export const handler = async (event: Partial<Event>) => {
  const githubSearchQuery = guardValue(event.query);
  const repoTableName = guardValue(process.env.REPO_TABLE_NAME);
  const githubAccessToken = guardValue(process.env.GITHUB_ACCESS_TOKEN);

  const gitHubClient = createGitHubClient(githubAccessToken);
  const repoRepository = createRepoRepository(repoTableName);

  const gitHubSearchResults = await gitHubClient.search({
    query: githubSearchQuery,
    limit: event.limit
  });

  const repos = gitHubSearchResultToRepos(gitHubSearchResults);
  await repoRepository.batchWrite(repos);
};

import { guardValue } from "./utils/guardValue";
import { createGitHubClient } from "./factories/createGitHubClient";
import { createRepoRepository } from "./factories/createRepoRepository";
import { gitHubSearchResultToRepos } from "./utils/gitHubSearchResultToRepos";
import { stringToRelativeTime } from "./repositories/stringToRelativeTime";

interface Event {
  query: string;
  limit: number;
  last: string;
}

export const handler = async (event: Partial<Event>) => {
  const githubSearchQuery = guardValue(event.query);
  const repoTableName = guardValue(process.env.REPO_TABLE_NAME);
  const githubAccessToken = guardValue(process.env.GITHUB_ACCESS_TOKEN);

  const gitHubClient = createGitHubClient(githubAccessToken);
  const repoRepository = createRepoRepository(repoTableName);

  const gitHubSearchResults = await gitHubClient.search({
    query: githubSearchQuery,
    limit: event.limit,
    last: stringToRelativeTime(event.last),
  });

  const repos = gitHubSearchResultToRepos(gitHubSearchResults);
  await repoRepository.batchWrite(repos);
};

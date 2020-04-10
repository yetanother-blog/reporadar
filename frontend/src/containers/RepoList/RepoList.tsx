import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useRepoListQuery } from "../../generated/graphql";
import { RepoCard } from "../../ui/RepoCard/RepoCard";
import { RepoCardList } from "../../ui/RepoCardList/RepoCardList";
import { sortByDay } from "../../utils/sortByDay";

const LIMIT = 50;

export const RepoListSkeleton: React.FC = () => (
  <RepoCardList time="2020-01-01" isLoading>
    <RepoCard name="" description="" url="" stars={0} loading />
    <RepoCard name="" description="" url="" stars={0} loading />
    <RepoCard name="" description="" url="" stars={0} loading />
  </RepoCardList>
);

export const RepoList: React.FC = () => {
  const { loading, data, fetchMore } = useRepoListQuery({
    variables: { limit: LIMIT }
  });

  if (loading) {
    return <RepoListSkeleton />;
  }

  if (!data || !data.allRepos) {
    return null;
  }

  const loadMore = () => {
    fetchMore({
      variables: { nextToken: data.allRepos.nextToken },
      updateQuery(prev, { fetchMoreResult }) {
        return fetchMoreResult
          ? {
              allRepos: {
                ...prev.allRepos,
                repos: [
                  ...prev.allRepos.repos,
                  ...fetchMoreResult.allRepos.repos
                ],
                nextToken: fetchMoreResult.allRepos.nextToken
              }
            }
          : prev;
      }
    });
  };

  const days = sortByDay(data.allRepos.repos, "indexedAt");

  return (
    <InfiniteScroll
      loadMore={loadMore}
      hasMore={!!data.allRepos.nextToken}
      loader={<RepoListSkeleton key="repo-list-skeleton" />}
    >
      {days.map(day => (
        <RepoCardList time={day.time} key={day.time}>
          {day.entities.map(repo => (
            <RepoCard
              key={repo.id}
              name={repo.id}
              description={repo.description}
              url={repo.url}
              stars={repo.numberOfStars}
            />
          ))}
        </RepoCardList>
      ))}
    </InfiniteScroll>
  );
};

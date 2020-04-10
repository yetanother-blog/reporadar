import React from "react";
import { useRepoListQuery } from "../../generated/graphql";
import { RepoCard } from "../../ui/RepoCard/RepoCard";
import { RepoCardList } from "../../ui/RepoCardList/RepoCardList";
import { sortByDay } from "../../utils/sortByDay";

export const RepoList: React.FC = () => {
  const { loading, data } = useRepoListQuery();

  if (loading) {
    return (
      <RepoCardList time="2020-01-01">
        <RepoCard name="" description="" url="" stars={0} loading={true} />
        <RepoCard name="" description="" url="" stars={0} loading={true} />
        <RepoCard name="" description="" url="" stars={0} loading={true} />
      </RepoCardList>
    );
  }

  if (!data || !data.allRepos) {
    return null;
  }

  const days = sortByDay(data.allRepos.repos, "indexedAt");

  return (
    <>
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
    </>
  );
};

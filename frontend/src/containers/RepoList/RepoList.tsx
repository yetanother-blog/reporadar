import React from "react";
import { useRepoListQuery } from "../../generated/graphql";
import { RepoCard } from "../../ui/RepoCard/RepoCard";
import { RepoCardList } from "../../ui/RepoCardList/RepoCardList";

export const RepoList: React.FC = () => {
  const { loading, data } = useRepoListQuery();

  if (loading) {
    return (
      <RepoCardList>
        <RepoCard name="" description="" url="" stars={0} loading={true} />
        <RepoCard name="" description="" url="" stars={0} loading={true} />
        <RepoCard name="" description="" url="" stars={0} loading={true} />
      </RepoCardList>
    );
  }

  if (!data) return null;

  return (
    <RepoCardList>
      {data.allRepos.repos.map((repo) => (
        <RepoCard
          key={repo.id}
          name={repo.id}
          description={repo.description}
          url={repo.url}
          stars={repo.numberOfStars}
        />
      ))}
    </RepoCardList>
  );
};

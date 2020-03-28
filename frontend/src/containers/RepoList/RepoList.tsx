import React from "react";
import { useRepoListQuery } from "../../generated/graphql";

export const RepoList: React.FC = () => {
  const { loading, error, data } = useRepoListQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  if (!data) return null;

  return (
    <ul>
      {data.allRepos.repos.map(repo => (
        <li>{repo.id}</li>
      ))}
    </ul>
  );
};

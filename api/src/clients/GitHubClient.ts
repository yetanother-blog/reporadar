import { GraphQLClient } from "graphql-request";

export interface SearchOptions {
  query: string;
  limit?: number;
}

export interface SearchResponse {
  search: {
    edges: {
      node: {
        nameWithOwner: string;
        description: string;
        url: string;
        stargazers: {
          totalCount: number;
        };
      };
    }[];
  };
}

export class GitHubClient {
  constructor(private client: GraphQLClient) {}

  search(options: SearchOptions) {
    const query = `
      query GitHubSearch($query: String!, $first: Int!) {
        search(type: REPOSITORY, query: $query, first: $first) {
          edges {
            node {
              ... on Repository {
                nameWithOwner
                description
                url
                stargazers {
                  totalCount
                }
              }
            }
          }
        }
      }
    `;

    return this.client.request<SearchResponse>(query, {
      query: options.query,
      first: options.limit || 10,
    });
  }
}

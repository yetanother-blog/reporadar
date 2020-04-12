import { GraphQLClient } from "graphql-request";
import moment, { DurationInputArg1, DurationInputArg2 } from "moment";

export interface SearchOptions {
  query: string;
  limit?: number;
  last?: [DurationInputArg1, DurationInputArg2];
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
    const last = options.last || [12, "months"];
    const created = moment()
      .subtract(...last)
      .format("YYYY-MM-DD");

    const gitHubQuery = `${options.query} created:>${created}`;

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
      query: gitHubQuery,
      first: options.limit || 10,
    });
  }
}

import AWS from "aws-sdk";

export interface Repo {
  id: string;
  description: string;
  url: string;
  numberOfStars: number;
  indexedAt: string;
  forkCount?: number;
  homepageUrl?: string;
  language?: string;
  topics: string[];
  type: "REPO";
  source: "GITHUB";
}

export class RepoRepository {
  constructor(
    private dynamoDBClient: AWS.DynamoDB.DocumentClient,
    private tableName: string
  ) {}

  async batchWrite(repos: Repo[]) {
    return Promise.all(
      repos.map((repo) =>
        this.dynamoDBClient
          .put({
            TableName: this.tableName,
            Item: repo,
            ConditionExpression: "attribute_not_exists(id)",
          })
          .promise()
      )
    ).catch((err) => {
      if (err.message !== "The conditional request failed") {
        throw err;
      }
    });
  }
}

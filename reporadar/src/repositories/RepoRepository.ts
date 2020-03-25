import AWS from "aws-sdk";
import { chunk } from "../utils/chunk";

export interface Repo {
  id: string;
  description: string;
  url: string;
}

export class RepoRepository {
  constructor(
    private dynamoDBClient: AWS.DynamoDB.DocumentClient,
    private tableName: string
  ) {}

  batchWrite(repos: Repo[]) {
    const putRequests = repos.map(repo => ({
      PutRequest: {
        Item: repo
      }
    }));

    const chunks = chunk(putRequests, 25);

    return Promise.all(
      chunks.map(chunk =>
        this.dynamoDBClient
          .batchWrite({
            RequestItems: {
              [this.tableName]: chunk
            }
          })
          .promise()
      )
    );
  }
}

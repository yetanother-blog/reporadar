import AWS from "aws-sdk";
import { RepoRepository } from "../repositories/RepoRepository";

export function createRepoRepository(tableName: string) {
  const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

  return new RepoRepository(dynamoDBClient, tableName);
}

# RepoRadar

[![](https://github.com/yetanother-blog/reporadar/workflows/CI/badge.svg)](https://github.com/yetanother-blog/reporadar/actions)

## Dependencies

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-reference.html#serverless-sam-cli)
- AWS CLI
- NodeJS
- Yarn
- Docker

## Development

We use a hybrid solution for the dev setup: Thanks to SAM, we can execute the Lambda functions locally, but we still need an instance of the stack on AWS to have infrastructure like the DynamoDB in place. Every developer should create their own instance by setting the `ENVIRONMENT` variable in the `.env` file.

1. Create a `.env` file (see `.env-template`)
2. Create a S3 bucket for the CloudFormation stack: `make create-bucket`
3. Deploy your stack: `make deploy`
4. Start the lambda functions locally: `make start`
5. Invoke the lambda functions: `make invoke`

## Resources

- [Tool to manage AWS credentials](https://github.com/Luzifer/awsenv)

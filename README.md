# RepoRadar

[![](https://github.com/yetanother-blog/reporadar/workflows/CI/badge.svg)](https://github.com/yetanother-blog/reporadar/actions)

## Dependencies

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-reference.html#serverless-sam-cli)
- AWS CLI
- NodeJS
- Yarn
- Docker

## Development

The setup is very test-driven: In theory, you could start a local environment with Sam, but it's not very helpful as the communication to Telegram is not working locally. The recommended approach is to implement new features with unit tests and then create a bot instance to test it directly in Telegram.

```shell
# Local dev environment
$ > make start

# Run unit tests
$ > make test

# Build TypeScript
$ > make build
```

## Resources

- [Tool to manage AWS credentials](https://github.com/Luzifer/awsenv)

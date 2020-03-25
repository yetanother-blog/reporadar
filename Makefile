$(shell touch .env)
include .env

AWS_REGION=eu-west-1
AWS_DEFAULT_REGION=eu-west-1
SOURCE_DIR=reporadar
BUCKET_NAME=reporadar-bucket-$(AWS_REGION)-$(ENVIRONMENT)
STACK_NAME=reporadar-$(ENVIRONMENT)

export AWS_REGION
export AWS_DEFAULT_REGION

$(SOURCE_DIR)/node_modules/.yarn-integrity: $(SOURCE_DIR)/yarn.lock
	yarn --cwd $(SOURCE_DIR)
	@touch $@

dependencies: $(SOURCE_DIR)/node_modules/.yarn-integrity

start: dependencies guard-ENVIRONMENT
	yarn --cwd $(SOURCE_DIR) tsc --watch & \
	REPO_TABLE_NAME=$(shell make table-name) \
	GITHUB_ACCESS_TOKEN=$(GITHUB_ACCESS_TOKEN) sam local start-lambda

invoke:
	@aws lambda invoke \
		--function-name "RepoRadar" \
		--endpoint-url "http://127.0.0.1:3001" \
		--payload '{ "query": "created:>2019-03-22 stars:>500 language:TypeScript sort:updated" }' \
		--no-verify-ssl response.json

build: dependencies
	yarn --cwd $(SOURCE_DIR) build

test: dependencies
	@ if [ "${CI}" = "true" ]; then \
			yarn --cwd $(SOURCE_DIR) test; \
	else \
		yarn --cwd $(SOURCE_DIR) test --watch; \
	fi

create-bucket: guard-ENVIRONMENT
	@aws s3 mb s3://$(BUCKET_NAME)

deploy: build guard-ENVIRONMENT guard-GITHUB_ACCESS_TOKEN
	@sam package --output-template-file packaged.yaml --s3-bucket $(BUCKET_NAME)
	@sam deploy \
		--template-file packaged.yaml \
		--stack-name ${STACK_NAME} \
		--capabilities CAPABILITY_IAM \
		--parameter-overrides ENVIRONMENT=${ENVIRONMENT} GITHUB_ACCESS_TOKEN=${{ env.GITHUB_ACCESS_TOKEN}}
	@aws cloudformation describe-stacks \
		--stack-name ${STACK_NAME} \
		--query 'Stacks[].Outputs' \
		--output table

table-name:
	@aws cloudformation describe-stacks \
		--stack-name ${STACK_NAME} \
		--query 'Stacks[].Outputs[?OutputKey==`RepoTableName`].OutputValue' \
		--output text

guard-%:
	@ if [ "${${*}}" = "" ]; then \
			echo "Environment variable $* not set"; \
			exit 1; \
	fi

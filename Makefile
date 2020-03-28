$(shell touch .env)
include .env

AWS_REGION=eu-west-1
AWS_DEFAULT_REGION=eu-west-1
API_SOURCE_DIR=api
FE_SOURCE_DIR=frontend
BUCKET_NAME=reporadar-bucket-$(AWS_REGION)-$(ENVIRONMENT)
STACK_NAME=reporadar-$(ENVIRONMENT)

export AWS_REGION
export AWS_DEFAULT_REGION

$(API_SOURCE_DIR)/node_modules/.yarn-integrity: $(API_SOURCE_DIR)/yarn.lock
	yarn --cwd $(API_SOURCE_DIR)
	@touch $@

$(FE_SOURCE_DIR)/node_modules/.yarn-integrity: $(FE_SOURCE_DIR)/yarn.lock
	yarn --cwd $(FE_SOURCE_DIR)
	@touch $@

dependencies: $(API_SOURCE_DIR)/node_modules/.yarn-integrity $(FE_SOURCE_DIR)/node_modules/.yarn-integrity

start-api: dependencies guard-ENVIRONMENT
	yarn --cwd $(API_SOURCE_DIR) tsc --watch & \
	REPO_TABLE_NAME=$(shell make table-name) \
	GITHUB_ACCESS_TOKEN=$(GITHUB_ACCESS_TOKEN) sam local start-lambda

start-fe:
	yarn --cwd $(FE_SOURCE_DIR) start

generate-graphql:
	yarn --cwd $(FE_SOURCE_DIR) generate

invoke:
	@aws lambda invoke \
		--function-name "RepoRadar" \
		--endpoint-url "http://127.0.0.1:3001" \
		--payload '{ "query": "created:>2019-03-22 stars:>500 language:TypeScript sort:updated" }' \
		--no-verify-ssl response.json

build: dependencies
	yarn --cwd $(API_SOURCE_DIR) build
	yarn --cwd $(FE_SOURCE_DIR) build

test: test-api test-fe

test-api: dependencies
	@ if [ "${CI}" = "true" ]; then \
			yarn --cwd $(API_SOURCE_DIR) test; \
	else \
		yarn --cwd $(API_SOURCE_DIR) test --watch; \
	fi

test-fe:
	yarn --cwd $(FE_SOURCE_DIR) test

invalidate-fe-cache:
	aws cloudfront create-invalidation --distribution-id ${shell make frontend-distribution-id} --paths \"/*\"

create-bucket: guard-ENVIRONMENT
	@aws s3 mb s3://$(BUCKET_NAME)

deploy-api: guard-ENVIRONMENT guard-GITHUB_ACCESS_TOKEN
	@sam package --output-template-file packaged.yaml --s3-bucket $(BUCKET_NAME)
	@sam deploy \
		--template-file packaged.yaml \
		--stack-name ${STACK_NAME} \
		--capabilities CAPABILITY_NAMED_IAM \
		--parameter-overrides Environment=${ENVIRONMENT} GitHubAccessToken=${GITHUB_ACCESS_TOKEN} \
		--no-fail-on-empty-changeset

deploy-fe:
	aws s3 sync ${FE_SOURCE_DIR}/build/ s3://${shell make frontend-bucket}/

deploy: build deploy-api deploy-fe

table-name:
	@aws cloudformation describe-stacks \
		--stack-name ${STACK_NAME} \
		--query 'Stacks[].Outputs[?OutputKey==`RepoTableName`].OutputValue' \
		--output text

frontend-bucket:
	@aws cloudformation describe-stacks \
		--stack-name ${STACK_NAME} \
		--query 'Stacks[].Outputs[?OutputKey==`FrontendBucket`].OutputValue' \
		--output text

frontend-distribution-id:
	@aws cloudformation describe-stacks \
		--stack-name ${STACK_NAME} \
		--query 'Stacks[].Outputs[?OutputKey==`FrontendDistributionId`].OutputValue' \
		--output text

guard-%:
	@ if [ "${${*}}" = "" ]; then \
			echo "Environment variable $* not set"; \
			exit 1; \
	fi

$(shell touch .env)
include .env

AWS_REGION=eu-west-1
AWS_DEFAULT_REGION=eu-west-1
SOURCE_DIR=reporadar
BUCKET_NAME=reporadar-$(AWS_REGION)
STACK_NAME=reporadar

export AWS_REGION
export AWS_DEFAULT_REGION

node_modules/.yarn-integrity: yarn.lock
	yarn
	@touch $@

$(SOURCE_DIR)/node_modules/.yarn-integrity: $(SOURCE_DIR)/yarn.lock
	yarn --cwd $(SOURCE_DIR)
	@touch $@

dependencies: node_modules/.yarn-integrity $(SOURCE_DIR)/node_modules/.yarn-integrity

start: dependencies
	yarn --cwd $(SOURCE_DIR) tsc --watch & sam local start-api

build: dependencies
	yarn --cwd $(SOURCE_DIR) build

test: dependencies
	@ if [ "${CI}" = "true" ]; then \
			yarn --cwd $(SOURCE_DIR) test; \
	else \
		yarn --cwd $(SOURCE_DIR) test --watch; \
	fi

create-bucket:
	@aws s3 mb s3://$(BUCKET_NAME)

deploy: build
	@sam package --output-template-file packaged.yaml --s3-bucket $(BUCKET_NAME)
	@sam deploy \
		--template-file packaged.yaml \
		--stack-name ${STACK_NAME} \
		--capabilities CAPABILITY_IAM
	@aws cloudformation describe-stacks \
		--stack-name ${STACK_NAME} \
		--query 'Stacks[].Outputs' \
		--output table

guard-%:
	@ if [ "${${*}}" = "" ]; then \
			echo "Environment variable $* not set"; \
			exit 1; \
	fi

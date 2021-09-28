# -------------------------------------- #
# -------------- Makefile -------------- #
# -------------------------------------- #

# Default commands and setup params
.DEFAULT_GOAL := help

# Useful vars
MY_USER=$(shell id -u)
MY_GROUP=$(shell id -g)
WORKDIR=$(shell pwd)
RUNNING_CONTAINERS=$(shell docker-compose ps -q)

.PHONY: help
help: ## Show this help message.
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
	    awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.PHONY: setup
setup: ## Run project fresh local dev install
	@$(MAKE) stop
	@$(MAKE) composer-install
	@$(MAKE) clear-cache
	@docker-compose build

.PHONY: start
start: ## Start the project dev environment
	@docker-compose up -d

.PHONY: stop
stop: ## Stop the project dev environment
	@if [[ ! -z "$(RUNNING_CONTAINERS)" ]]; then docker-compose stop; fi

.PHONY: logs
logs: ## Tail stream all dev container logs
	@docker-compose logs -f

.PHONY: test
test: ## Run project tests
	@$(MAKE) code-check
	@$(MAKE) unit-tests

# -------------------------------------- #
# ----- HELPER COMMANDS BELOW HERE ----- #
# -------------------------------------- #

.PHONY: init
init:
	@$(MAKE) setup

.PHONY: build
build:
	@docker-compose build

.PHONY: up
up:
	@$(MAKE) start

.PHONY: down
down:
	@$(MAKE) stop

.PHONY: composer-install
composer-install:
	@docker run --rm --interactive --tty \
	    --volume $(WORKDIR):/app \
	    --user $(MY_USER):$(MY_GROUP) \
	    --volume $(SSH_AUTH_SOCK):/ssh-auth.sock \
	    --env SSH_AUTH_SOCK=/ssh-auth.sock \
	    composer install

.PHONY: composer-update
composer-update:
	@docker run --rm --interactive --tty \
	    --volume $(WORKDIR):/app \
	    --user $(MY_USER):$(MY_GROUP) \
	    --volume $(SSH_AUTH_SOCK):/ssh-auth.sock \
	    --env SSH_AUTH_SOCK=/ssh-auth.sock \
	    composer update

.PHONY: clear-cache
clear-cache:
	@docker run --rm --interactive --tty \
	    --volume $(WORKDIR):/app \
	    --workdir /app \
	    php:7.3-alpine \
	    ./artisan cache:clear

.PHONY: unit-tests
unit-tests:
	@docker run --rm --interactive --tty \
	    --volume $(WORKDIR):/app \
	    --workdir /app \
	    php:7.3-alpine \
	    vendor/bin/phpunit

.PHONY: code-check
code-check:
	@docker run --rm --interactive --tty \
	    --volume $(WORKDIR):/app \
	    --workdir /app \
	    php:7.3-alpine \
	    vendor/bin/php-cs-fixer fix --using-cache=no --verbose --diff --dry-run --stop-on-violation

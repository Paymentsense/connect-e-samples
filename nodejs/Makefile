# Control verbosity, example call:
# $ V=1 make lint
V 						?= 0
VERBOSE_FLAG 	=
QUIET 				= @
ifneq ($V,0)
	QUIET =
	VERBOSE_FLAG = -v
endif

.DEFAULT_GOAL						:= all
MAKEFLAGS 							+= --environment-overrides --warn-undefined-variables
# .ONESHELL:
SHELL										:= bash

IMAGE_NAME							= connect-e-samples/nodejs

.PHONY: install run
all: install run

.PHONY: run-clean
run-clean: install-clean run

.PHONY: install-clean
install-clean:
	$(QUIET) rm -fvr node_modules || echo "No 'node_modules' to delete"
	$(QUIET) yarn install --frozen-lockfile

.PHONY: install
install:
	$(QUIET) yarn install --frozen-lockfile

.PHONY: run
run:
	$(QUIET) yarn start

.PHONY: build-docker
build-docker:
	$(QUIET) docker build \
		--file Dockerfile \
		--tag ${IMAGE_NAME}:latest \
		.

.PHONY: run-docker
run-docker:
	$(QUIET) docker run \
		--rm \
		--tty \
		--interactive \
		--publish 8080:8080 \
		${IMAGE_NAME}:latest

.PHONY: lint
lint:
	$(QUIET) yarn run lint

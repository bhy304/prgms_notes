ARCH=amd64
IMG_TAG=prgms-notes-frontend

all:
	cat ./Makefile

test:
	CI=true npm test

node:
	npm ci
	npm run build

image: Dockerfile node
	docker build --platform=linux/${ARCH} --tag ${IMG_TAG} .

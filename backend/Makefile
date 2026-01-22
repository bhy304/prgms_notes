ARCH=amd64
IMG_TAG=bhy0512/prgms-notes-backend:latest

all:
	cat ./Makefile

test:
	npm test

node:
	npm ci
	npm run build

image: Dockerfile node
	docker build --platform=linux/${ARCH} --tag ${IMG_TAG} .

push:
	docker push ${IMG_TAG}

deploy: notes-be.yaml configmap.yaml
	kubectl apply -f ../namespace.yaml
	kubectl apply -f configmap.yaml
	kubectl apply -f notes-be.yaml

undeploy:
	kubectl delete -f notes-be.yaml
	kubectl delete -f configmap.yaml

clean:
	rm -rf build
	docker rmi ${IMG_TAG}

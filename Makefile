VERSION ?= latest
REGISTRY ?= technosophos

.PHONY: build
build: docker-build
build: docker-push

.PHONY: docker-build
docker-build:
	docker build -t $(REGISTRY)/twitter-t:$(VERSION) .

.PHONY: docker-push
docker-push:
	docker push $(REGISTRY)/twitter-t:$(VERSION)

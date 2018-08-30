NAME ?= flexlmjs

install:
	npm install

build:
	docker build -t $(NAME) .

bash: build
	docker run -it --rm --entrypoint /bin/bash $(NAME)

run: build
	docker run -it -p 8080:8080 -d $(NAME)

test:
	curl localhost:8080

clean:
	rm -rf node_modules

.PHONY: install build run test clean


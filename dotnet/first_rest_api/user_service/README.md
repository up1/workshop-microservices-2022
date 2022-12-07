# Create first API with .Net 6

## Working with Docker in development

```
$docker compose -f docker-compose-dev.yml build
$docker compose -f docker-compose-dev.yml up -d
$docker compose -f docker-compose-dev.yml ps
$docker compose -f docker-compose-dev.yml logs --follow
```

Testing with urls
* http://localhost:5000/swagger/index.html
* http://localhost:5000/v1/users
* http://localhost:5000/v1/users/1

## Working with Docker in production
```
$docker image build -t user_service:1.0 .
docker container run -d -p 8888:80 user_service:1.0
```

Testing with urls
* http://localhost:8888/v1/users
* http://localhost:8888/v1/users/1

## Working with Docker compose
```
$docker compose build

$docker compose up -d

$docker compose ps
$docker compose log --follow
```
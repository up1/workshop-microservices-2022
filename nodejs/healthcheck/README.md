# Demo with health check
* Working with [Redis](https://redis.io/)

## Start server
```
$npm install
$node service.js
```

Call health check url with http://localhost:3000/health

## Start Redis with Docker
```
$docker container run -d  -p 6379:6379 redis:7.0.5
$docker container run -d  -p 7379:6379 redis:7.0.5
```

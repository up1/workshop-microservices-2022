# Demo with application metric
* [Prometheus](https://prometheus.io/)
* [Grafana](https://grafana.com/)

## Start server
```
$npm install
$node service.js
```

* Call URL
  * Home = http://localhost:3000
  * Login success = http://localhost:3000/login?name=ok
  * Login failure = http://localhost:3000/login?name=not_ok
* Call metric url with http://localhost:3000/metrics

## Start Redis with Docker
```
$docker container run -d  -p 6379:6379 redis:7.0.5
$docker container run -d  -p 7379:6379 redis:7.0.5
```

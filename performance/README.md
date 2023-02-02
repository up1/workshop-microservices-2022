# Performacne testing with [wrk](https://github.com/wg/wrk)


```
$wrk -t 5 -c 100 -d 10s <url>
```

## NodeJS + express

```
$cd nodejs
$npm install
$node api.js
```

Access to URL = http://localhost:3000


## Go + [Echo framework](https://echo.labstack.com/)

```
$cd go
$go mod tidy
$go run api.go
```

Access to URL = http://localhost:1323

## Java + Spring Boot

```
$cd java
$./mvnw spring-boot:run
```
Access to URL = http://localhost:8080
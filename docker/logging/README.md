# Demo [logging with Docker](https://docs.docker.com/config/containers/logging/configure/#supported-logging-drivers)
* Docker logging driver = [gelf](https://docs.docker.com/config/containers/logging/gelf/)
  * Graylog
  * Logstash
  * Fluentd 
* Use Logstash

## Step 1 :: Start Logstash
* Input : gelf
* Output : stdout

```
$docker-compose up -d logstash
$docker-compose ps
$docker-compose logs --follow logstash
```

## Step 2 :: Generate log from app
```
$docker-compose up demo_app
```

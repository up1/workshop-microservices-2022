# Demo logging with Docker
* Docker logging driver = gelf
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
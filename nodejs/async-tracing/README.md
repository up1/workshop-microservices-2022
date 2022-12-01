# Workshop with Asynchronous communication
* [RabbitMQ](https://www.rabbitmq.com/)
  * Topic/Fanout
* Tracing
  * OpenTelemetry
  * Jaeger

## Step 1 :: Start RabbitMQ server
```
$docker container run -d --name rabbit \
	-e RABBITMQ_DEFAULT_USER=user \
	-e RABBITMQ_DEFAULT_PASS=password \
	-p 15672:15672 \
    -p 5672:5672 \
	rabbitmq:3-management
```

## Step 2 :: Start service 1 as publisher/producer
```
$SERVICE=service_1 node --require './tracing.js' service_1.js
```

## Step 3 :: Start service 2 and 3 as subscriber/consumer
```
$SERVICE=service_2 node --require './tracing.js' service_2.js

$SERVICE=service_3 node --require './tracing.js' service_2.js
```

## Step 3 :: Send data to service 1
```
$curl http://localhost:3000
```

## Step 4 :: Start Jaeger server
```
$docker container run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HOST_PORT=:9411 \
  -e COLLECTOR_OTLP_ENABLED=true \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 4317:4317 \
  -p 4318:4318 \
  -p 14250:14250 \
  -p 14268:14268 \
  -p 14269:14269 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.39
```

Open URL= http://localhost:16686 in web browser

# Demo with distributed tracing
* [OpenTelemetry](https://opentelemetry.io/)
* Tracing server
  * [Zipkin](https://zipkin.io/)
  * [Jaeger](https://www.jaegertracing.io/)

## Start server with zipkin
```
$npm install
$EXPORTER=zipkin node service.js
```

## Start client
```
$npm install
$EXPORTER=zipkin node client.js
```

## Start Zipkin server
Start container
```
$docker container run -d -p 9411:9411 openzipkin/zipkin
```

Open url=http://localhost:9411 in browser

## Start Jaeger server
Start service and client
```
$EXPORTER=jaeger node service.js

$EXPORTER=jaeger node client.js
```

Start container
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

Open url=http://localhost:16686 in browser


## Config Tracing ให้ trace แค่ request บางส่วนอย่างไร ?
* [Sampling in OpenTelemetry](https://opentelemetry.io/docs/instrumentation/js/sampling/)

### Solution 1 :: Environment variables

Data sample = 10%
```
export OTEL_TRACES_SAMPLER="traceidratio"
export OTEL_TRACES_SAMPLER_ARG="0.1"
```

### Solution 2 :: Coding in tracer.js
```
const { TraceIdRatioBasedSampler } = require('@opentelemetry/sdk-trace-node');
const samplePercentage = 0.1;

const provider = new NodeTracerProvider({
  sampler: new TraceIdRatioBasedSampler(samplePercentage),
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
  }),
});
```

### Reference Websites
* [OpemTelemetry for NodeJS](https://opentelemetry.io/docs/instrumentation/js/getting-started/nodejs/)
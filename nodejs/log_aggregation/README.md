# Demo with log aggregation
* [ELK stack](https://www.elastic.co)
  * Elasticseach
  * Logstash
  * Kibana

* Issue :: [Using the Docker images in productionedit](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html#docker-prod-prerequisites)


## Best practices for Logging
* Structured logging (JSON)
* Build meaning and context into log message (timestamp, service name, user request, unique identifier)
* Avoid non-essential or sensitive data
* Aggregate and centralize log
* Indexing logs for query and analytic
* Optimize log retention policy
* Monitoring and alert from logs

## Workshop :: Distributed tracing and logging
* [Winston](https://www.npmjs.com/package/winston)
* [OpenTelemetry instrumentation for winston](https://www.npmjs.com/package/@opentelemetry/instrumentation-winston)
```
$npm install
$EXPORTER=zipkin node service.js
```
Test with url = http://localhost:3000/test

## Start log process with ELK stack
```
$npm install
$node test_log.js
```

## Start [ELK stack with Docker compose](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)
```
$cd elk
$docker-compose up -d es01
$docker-compose logs --follow


$docker-compose up -d kibana
$docker-compose up -d logstash

$docker-compose ps

NAME                COMMAND                  SERVICE             STATUS               PORTS
elk-es01-1          "/bin/tini -- /usr/l…"   es01                running (healthy)    0.0.0.0:9200->9200/tcp, 9300/tcp
elk-kibana-1        "/bin/tini -- /usr/l…"   kibana              running (healthy)   0.0.0.0:5601->5601/tcp
elk-logstash-1      "/usr/local/bin/dock…"   logstash            running              5044/tcp, 9600/tcp, 0.0.0.0:12201->12201/udp
elk-setup-1         "/bin/tini -- /usr/l…"   setup               exited (0)
```

Open url in browser
* Kibana = http://localhost:5601

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

## Start Prometheus server
Edit file `prometheus.yml`
```
scrape_configs:
  - job_name: 'service'
    scrape_interval: 5s
    static_configs:
      - targets: ['host.docker.internal:3000']
        labels:
          service: 'my-service'
          group: 'production'
```

Start container
```
$docker container run -d -p 9090:9090 \
  -v $(pwd)/prometheus-data:/prometheus-data prom/prometheus \
  --config.file=/prometheus-data/prometheus.yml
```

Open url=http://localhost:9090 in browser

## Start Grafana server
```
$docker container run -d -p 3001:3000 grafana/grafana-oss
```

Open url=http://localhost:3000 in browser
* username=admin
* password=admin


### Reference Websites
* [Prom-client example](https://github.com/siimon/prom-client/tree/master/example)
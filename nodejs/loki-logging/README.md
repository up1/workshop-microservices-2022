# Demo loggin with Loki + Grafana
* NodeJS
  * express
  * winston, winston-loki
* Loki
* Grafana


## Step to run
```
$docker compose build
$docker compose up -d

$docker compose ps
NAME                COMMAND                  SERVICE             STATUS              PORTS
grafana             "/run.sh"                grafana             running             0.0.0.0:3000->3000/tcp
loki                "/usr/bin/loki --con…"   loki                running             0.0.0.0:3100->3100/tcp
nodejs              "docker-entrypoint.s…"   web                 running             0.0.0.0:8080->8080/tcp
```

Url for testing
* Grafana => http://localhost:3000/explore

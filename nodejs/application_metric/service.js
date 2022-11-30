"use strict";

const express = require("express");
const promClient = require("prom-client");
const promBundle = require("express-prom-bundle");

const app = express();
const port = process.env.PORT || 3000;

// Prometheus metrics
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: {},
  },
});
app.use(metricsMiddleware);

// Default
app.get("/", (req, res, next) => {
  setTimeout(() => {
    res.json({ message: "This is service" });
    next();
  }, Math.round(Math.random() * 200));
});

const counter = new promClient.Counter({
  name: "login",
  help: "c1 help",
  labelNames: ["status"],
});

app.get("/login", (req, res, next) => {
  if (req.query.name == "ok") {
    counter.inc({ status: "success" }, 1);
    res.status(200).json("Login success");
  } else {
    counter.inc({ status: "failure" }, 1);
    res.status(500).json("Login fail!!");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

// Graceful shutdown for NodeJS app
process.on("SIGTERM", () => {
  process.exit(0);
});

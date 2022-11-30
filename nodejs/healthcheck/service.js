"use strict";

const express = require("express");
const Redis = require("ioredis");

const redis = new Redis(6379, "localhost");
const redis2 = new Redis(7379, "localhost");
const app = express();
const port = process.env.PORT || 3000;
const HEALTH_TIMEOUT = 1000;

app.get("/health", (req, res) => {
  promiseTimeout(redis.ping(), HEALTH_TIMEOUT)
    .then(() => promiseTimeout(redis2.ping(), HEALTH_TIMEOUT))
    .then(() => res.json({ status: "ok" }))
    .catch((err) => {
      res.statusCode = 500;
      res.json({ status: "error" });
    });
});

app.listen(port, () => {
  console.info(`Server is listening on port ${port}!`);
});

function promiseTimeout(originalPromise, timeout) {
  return Promise.race([
    Promise.resolve(originalPromise),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Timed out"));
      }, timeout);
    }),
  ]);
}

"use strict";

const tracer = require("./tracer")("service-1");
const api = require("@opentelemetry/api");
const express = require("express");
const axios = require("axios").default;

const app = express();
const PORT = 3000;

const getController = () => {
  const router = express.Router();
  const resources = [];
  router.get("/", (req, res) => res.send(resources));
  router.post("/", (req, res) => {

    // Write logging with tracing
    const winston = require('winston');
    const logger = winston.createLogger({
      transports: [new winston.transports.Console()],
    })
    logger.info({
      action: "get-data",
      status: "success"
    });

    resources.push(req.body);
    return res.status(201).send(req.body);
  });
  return router;
};

const login = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization && authorization.includes("secret_token")) {
    next();
  } else {
    res.sendStatus(401);
  }
};

app.use(express.json());
app.get("/status", (req, res) => res.status(200).send("OK"));
app.get("/test", async (req, res) => {
  // Custom span
  const currentSpan = api.trace.getSpan(api.context.active());
  console.log(`traceid: ${currentSpan.spanContext().traceId}`);

  const span = tracer.startSpan("Call /test", {
    kind: 1, // server
    attributes: { key: "value" },
  });
  // Annotate our span to capture metadata about the operation
  span.addEvent("invoking /test");

  const createdMovie = await axios.post(
    `http://localhost:${PORT}/movies`,
    {
      Title: "Avatar",
      Year: "2009",
      Rated: "PG-13",
      Released: "18 Dec 2009",
      Runtime: "162 min",
      Genre: "Action, Adventure, Fantasy",
      Director: "James Cameron",
      Writer: "James Cameron",
    },
    {
      headers: {
        Authorization: "secret_token",
      },
    }
  );
  span.end();
  return res.status(201).send(createdMovie.data);
});
app.use("/movies", login, getController());

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

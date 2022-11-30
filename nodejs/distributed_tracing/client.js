"use strict";

const tracer = require("./tracer")("client");
const api = require("@opentelemetry/api");
const axios = require("axios").default;
var count = 10;

function sendRequest() {
  const span = tracer.startSpan("client.sendRequest()", {
    kind: api.SpanKind.CLIENT,
  });

  api.context.with(api.trace.setSpan(api.ROOT_CONTEXT, span), async () => {
    try {
      const res = await axios.get("http://localhost:3000/test");
      console.log("Status:", res.status + ", " + res.statusText);
      span.setStatus({ code: api.SpanStatusCode.OK });
    } catch (e) {
      console.log("Failed:", e.message);
      span.setStatus({ code: api.SpanStatusCode.ERROR, message: e.message });
    }
    span.end();
    count--;
  });
}

const setIntervalRef = setInterval(sendRequest, 1000);
setTimeout(() => clearInterval(setIntervalRef), 11000);

"use strict";

const opentelemetry = require("@opentelemetry/api");
const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");
const { SimpleSpanProcessor } = require("@opentelemetry/sdk-trace-base");
const { JaegerExporter } = require("@opentelemetry/exporter-jaeger");
const { ZipkinExporter } = require("@opentelemetry/exporter-zipkin");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");

const { TraceIdRatioBasedSampler } = require('@opentelemetry/sdk-trace-node');
const samplePercentage = 0.1;

const EXPORTER = process.env.EXPORTER || "";

module.exports = (serviceName) => {
  const provider = new NodeTracerProvider({
    sampler: new TraceIdRatioBasedSampler(samplePercentage),
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  let exporter;
  if (EXPORTER.toLowerCase().startsWith("z")) {
    exporter = new ZipkinExporter();
    // exporter = new ZipkinExporter({
    //   url: 'http://zipkin:9411/api/v2/spans'
    // });
  } else {
    exporter = new JaegerExporter();
  }

  provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();

  registerInstrumentations({
    // // when boostraping with lerna for testing purposes
    instrumentations: [new HttpInstrumentation()],
  });

  return opentelemetry.trace.getTracer("http-example");
};

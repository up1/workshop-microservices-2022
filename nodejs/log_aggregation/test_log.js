const winston = require("winston");
const WinstonLogStash = require("winston3-logstash-transport");

var logger = winston.createLogger();
logger.add(
  new WinstonLogStash({
    mode: "udp",
    host: "127.0.0.1",
    port: 12201,
    appName: "demo",
    level: "debug",
  })
);

let interval = 1000 * 2;

log = () => {
  let i = 0;
  logger.debug({
    someMeta: "someData",
    array: [1, 2, 3],
    counter: i++,
  });
};

setInterval(log, interval);

const amqplib = require("amqplib");
let rabbitConnection;
let exchange = "logs";

const rabbitMqListenToMessages = async (callback) => {
  if (!rabbitConnection) {
    rabbitConnection = await amqplib.connect({
      username: "user",
      password: "password",
    });
  }
  const channel = await rabbitConnection.createChannel();
  await channel.assertExchange(exchange, "fanout");
  const q = await channel.assertQueue("");
  await channel.bindQueue(q.queue, exchange, "");
  await channel.consume(
    q.queue,
    (message) => callback(message.content.toString()),
    { noAck: true }
  );
};

rabbitMqListenToMessages((message) =>
  console.log(`Consumer received message: ${message}`)
);

console.log(`${process.env.SERVICE} Running`);

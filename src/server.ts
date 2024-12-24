import "dotenv/config";

import fastify from "fastify";
import AutoLoad from "@fastify/autoload";
import path from "path";
import { Queue } from "bullmq";
import { redisConnection } from "@/redis";

export const server = fastify();
server.register(AutoLoad, {
  dir: path.join(__dirname, "api/routes"),
  options: Object.assign({}),
});

server.register(AutoLoad, {
  dir: path.join(__dirname, "fastify-plugins"),
  options: Object.assign({}),
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

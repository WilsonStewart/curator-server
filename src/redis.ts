import { ConnectionOptions, RedisConnection } from "bullmq";

export const redisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST ? process.env.REDIS_HOST : "localhost",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDUS_PASSWORD,
};

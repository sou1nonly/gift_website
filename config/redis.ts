import { createClient, RedisClientType } from "redis";

const client: RedisClientType = createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});

client.on("error", (err: Error) => {
  console.error("Redis error:", err);
});

export default client;
import Redis from "ioredis";

const REDIS_ENDPOINT = process.env.REDIS_ENDPOINT;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const client = new Redis(
  `redis://default:${REDIS_PASSWORD}@${REDIS_ENDPOINT}:41376`
);

export const set = async (key = "none", value: any, expirationInDays = 1) => {
  return client.set(key, value, "EX", 60 * 60 * 24 * expirationInDays);
};

export const get = async (key: string) => {
  return client.get(key);
};

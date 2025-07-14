import { Redis } from "@upstash/redis";

const UPSTASH_REDIS_REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_REDIS_REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = new Redis({
  url: UPSTASH_REDIS_REST_URL!,
  token: UPSTASH_REDIS_REST_TOKEN!,
});

export const set = async (key = "none", value: any, expirationInDays = 1) => {
  return redis.set(key, value, { ex: 60 * 60 * 24 * expirationInDays });
};

export const get = async (key: string) => {
  return redis.get(key);
};

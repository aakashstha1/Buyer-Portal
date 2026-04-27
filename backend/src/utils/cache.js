import client from "../configs/redis.js";

export const getOrSetCache = async (key, cb, ttl = 60) => {
  const cached = await client.get(key);
  if (cached) {
    console.log("Cache hit");
    return JSON.parse(cached);
  }

  const data = await cb();

  await client.set(key, JSON.stringify(data), { EX: ttl });
  return data;
};

import * as redis from 'redis';

export const RedisProvider = () => {
  const pool = redis.createClient();

  (async () => {
    await pool.connect();
  })();

  pool.on('ready', () => {
    console.log(
      '\x1b[32m%s\x1b[0m',
      `Connection pool REDIS_POOL (Redis) created`
    );
  });
  pool.on('error', (err) => {
    console.log(`Connection Error: ${err}`);
  });

  return pool;
};

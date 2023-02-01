import { RedisClientType } from '@redis/client';
import { RedisRepositoryConfiguration } from './RedisConfiguration';

export abstract class RedisRepository {
  constructor(
    protected readonly pool: RedisClientType,
    private readonly configuration: RedisRepositoryConfiguration
  ) {}

  protected async exists(key: string): Promise<boolean> {
    if (this.configuration.debug) console.log(`key path: ${key}`);
    const result: number = await this.pool.exists(key);
    return result === 1;
  }

  protected async get(key: string): Promise<string | undefined> {
    if (this.configuration.debug) console.log(`key path: ${key}`);
    return this.pool.get(key) ?? undefined;
  }

  protected async set(
    key: string,
    value: string,
    expiresIn: number
  ): Promise<string> {
    if (this.configuration.debug)
      console.log(`key path: ${key} \nvalue: ${value}`);
    return this.pool.set(key, value, { EX: expiresIn });
  }

  protected async del(key: string): Promise<boolean> {
    if (this.configuration.debug) console.log(`key path: ${key}`);
    const result: number = await this.pool.del(key);
    return result > 0;
  }
}

import { RedisClientType } from '@redis/client';
import { RedisRepositoryConfiguration } from './RedisConfiguration';

export abstract class RedisRepository {
  constructor(
    protected readonly pool: RedisClientType,
    private readonly configuration: RedisRepositoryConfiguration
  ) {}

  protected async get(key: string): Promise<any | undefined> {
    if (this.configuration.debug) console.log(key);
    const start = performance.now();
    const value = await this.pool.get(key);
    if (this.configuration.debug) console.log(performance.now() - start);
    return value ?? undefined;
  }

  protected async set(key: string, value: any, expiresIn: number): Promise<string> {
    if (this.configuration.debug) {
      console.log(key);
      console.log(value);
    }
    const start = performance.now();
    const response = await this.pool.set(key, value, { EX: expiresIn });
    if (this.configuration.debug) console.log(performance.now() - start);
    return response;
  }
}

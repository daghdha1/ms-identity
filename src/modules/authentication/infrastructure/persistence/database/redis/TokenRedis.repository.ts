import { TokenRepository } from '@Authentication/domain/repository/Token.repository';
import { Inject } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
import { RedisRepository } from '@Shared/redis-custom-provider/RedisRepository';
import { AppConstants } from 'app.constants';

export class TokenRedisRepository extends RedisRepository implements TokenRepository {
  constructor(
    @Inject(AppConstants.REDIS_POOL)
    protected pool: RedisClientType
  ) {
    super(pool, { debug: false });
  }

  public async existsRefreshToken(username: string): Promise<boolean> {
      return this.exists(`${process.env.REDIS_AUTH_REFRESH_TOKEN_PATH}:${username}`);
  }

  public async getRefreshToken(username: string): Promise<string | undefined> {
    const strObj = await this.get(`${process.env.REDIS_AUTH_REFRESH_TOKEN_PATH}:${username}`);
    return strObj ? JSON.parse(strObj)?.refresh_token : undefined;
  }

  public async saveRefreshToken(
    username: string,
    refreshToken: string
  ): Promise<boolean> {
    const response = await this.set(
      `${process.env.REDIS_AUTH_REFRESH_TOKEN_PATH}:${username}`,
      JSON.stringify({ refresh_token: refreshToken }),
      Number(process.env.REDIS_AUTH_REFRESH_TOKEN_EXPIRES_IN)
    );
    return response === 'OK' ? true : false;
  }

  public async revokeRefreshToken(username: string): Promise<boolean> {
    console.log(username);
    return null;
  }
}

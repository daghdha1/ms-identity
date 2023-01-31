import { jwtConstants } from '@Authentication/authentication.constants';
import { TokenRepository } from '@Authentication/domain/repository/Token.repository';
import { Inject } from '@nestjs/common';
import { RedisClientType } from '@redis/client';
import { RedisRepository } from '@Shared/redis-custom-provider/RedisRepository';
import { AppConstants } from 'app.constants';

export class TokenRedisRepository
  extends RedisRepository
  implements TokenRepository
{
  constructor(
    @Inject(AppConstants.REDIS_POOL)
    protected pool: RedisClientType
  ) {
    super(pool, { debug: true });
  }

  public async getAccessToken(clientId: string): Promise<string | undefined> {
    const strObj = await this.get(`${process.env.REDIS_AUTH_PATH}:${clientId}`);
    return JSON.parse(strObj).access_token ?? undefined;
  }

  public async saveAccessToken(
    clientId: string,
    accessToken: string
  ): Promise<boolean> {
    const response = await this.set(
      `${process.env.REDIS_AUTH_PATH}:${clientId}`,
      JSON.stringify({ access_token: accessToken }),
      Number(jwtConstants.expires_in)
    );
    return response === 'OK' ? true : false;
  }
}

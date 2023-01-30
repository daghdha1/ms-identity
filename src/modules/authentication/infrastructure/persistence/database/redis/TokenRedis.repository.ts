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
    super(pool, { debug: false });
  }

  public async getAccessToken(clientId: string): Promise<string | undefined> {
    return (await this.get(clientId)).access_token;
  }

  public async saveAccessToken(
    clientId: string,
    accessToken: string,
    expiresIn: number
  ): Promise<boolean> {
    const response = await this.set(clientId, { access_token: accessToken }, expiresIn);
    return response === 'OK' ? true : false;
  }
}

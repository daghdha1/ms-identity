import { TokenRepository } from '@Auth/domain/repository/Token.repository'
import { Inject } from '@nestjs/common'
import { RedisClientType } from '@redis/client'
import { Provider, RedisRepository } from 'pkg-shared'

export class TokenRedisRepository extends RedisRepository implements TokenRepository {
  constructor(
    @Inject(Provider.Redis)
    protected pool: RedisClientType
  ) {
    super(pool, { debug: false })
  }

  public async existsSessionToken(username: string): Promise<boolean> {
    return this.exists(`${process.env.REDIS_AUTH_SESSION_TOKEN_PATH}:${username}`)
  }

  public async getSessionToken(username: string): Promise<string | undefined> {
    const strObj = await this.get(`${process.env.REDIS_AUTH_SESSION_TOKEN_PATH}:${username}`)
    return strObj ? JSON.parse(strObj)?.session_token : undefined
  }

  public async saveSessionToken(username: string, sessionToken: string): Promise<boolean> {
    const response = await this.set(
      `${process.env.REDIS_AUTH_SESSION_TOKEN_PATH}:${username}`,
      JSON.stringify({ session_token: sessionToken }),
      Number(process.env.REDIS_AUTH_SESSION_TOKEN_EXPIRES_IN)
    )
    return response === 'OK' ? true : false
  }

  //TODO: Revocar token???
  public async revokeSessionToken(username: string): Promise<boolean> {
    console.log(username)
    return null
  }
}

import { Injectable } from '@nestjs/common'
import { compareStrWithStrHashed, decryptStr } from 'pkg-shared'
import { GetUserService } from '@User/application/service/GetUser.service'
import { User } from '@User/domain/entity/User'
import { TokenRepository } from '@Auth/domain/repository/Token.repository'

@Injectable()
export class AuthService {
  constructor(private readonly getUserService: GetUserService, private readonly tokenRepository: TokenRepository) {}

  public async validateUserSignin(username: string, password: string): Promise<User | undefined> {
    const user: User = await this.getUserService.run({ username })
    const isValidPassword: boolean = await compareStrWithStrHashed(password, user.password)
    if (!isValidPassword) return undefined
    return user
  }

  public async validateUserLoggedin(username: string, sessionToken: string): Promise<User | undefined> {
    const user: User = await this.getUserService.run({
      username
    })
    const redisSessionToken: string = await this.tokenRepository.getSessionToken(user.username)
    if (!redisSessionToken || redisSessionToken !== sessionToken) return undefined
    return user
  }

  public async validateUserApi(client_id: string, client_secret: string): Promise<User | undefined> {
    const user: User = await this.getUserService.run({ client_id })
    if (!user || !this.isValidClientSecret(client_secret, user)) return undefined
    return user
  }

  private isValidClientSecret(clientSecret: string, user: User): boolean {
    const clientSecretDecrypted: string = decryptStr(user.clientSecret, user.password)
    return clientSecret === clientSecretDecrypted
  }
}

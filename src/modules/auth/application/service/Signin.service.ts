import { Injectable } from '@nestjs/common';
import { decryptStr, generateRandomHex } from 'pkg-shared';
import { User } from '@User/domain/entity/User';
import { TokenRepository } from '@Auth/domain/repository/Token.repository';
import { LoggedinResponseType } from '@Auth/domain/types/LoggedinResponse.type';

@Injectable()
export class SigninService {
  constructor(private readonly tokenRepository: TokenRepository) {}

  public async run(user: User): Promise<LoggedinResponseType> {
    const sessionToken: string = generateRandomHex(32);
    await this.tokenRepository.saveSessionToken(user.username, sessionToken);
    
    return {
      client_id: user.clientId,
      client_secret: decryptStr(user.clientSecret, user.password),
      session_token: sessionToken,
    };
  }
}

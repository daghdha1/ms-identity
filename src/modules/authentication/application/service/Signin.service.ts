import { SigninException } from '@Authentication/domain/exception/SigninException';
import { TokenRepository } from '@Authentication/domain/repository/Token.repository';
import { SigninResponseType } from '@Authentication/domain/types/SigninResponse.type';
import { Injectable } from '@nestjs/common';
import {
  compareStrWithStrHashed,
  decryptStr,
  generateRandomHex,
} from 'pkg-shared';
import { GetUserService } from '@User/application/service/GetUser.service';
import { User } from '@User/domain/entity/User';
import { SigninDto } from '../dto/Signin.dto';

@Injectable()
export class SigninService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly tokenRepository: TokenRepository
  ) {}

  public async run(dto: SigninDto): Promise<SigninResponseType> {
    const user: User = await this.getUserService.run({
      username: dto.username,
    });

    const isValidPassword: boolean = await compareStrWithStrHashed(
      dto.password,
      user.password
    );
    if (!isValidPassword) throw new SigninException('Unauthorized', null, {});

    const refreshToken: string = generateRandomHex(32);
    await this.tokenRepository.saveRefreshToken(dto.username, refreshToken);

    return {
      client_id: user.clientId,
      client_secret: decryptStr(user.clientSecret, user.password),
      refresh_token: refreshToken,
    };
  }
}

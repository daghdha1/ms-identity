import { SigninException } from '@Authentication/domain/exception/SigninException';
import { TokenRepository } from '@Authentication/domain/repository/Token.repository';
import { SigninResponseType } from '@Authentication/domain/types/SigninResponse.type';
import { Injectable } from '@nestjs/common';
import { decryptStr } from '@Shared/utils/Encryption';
import { GetUserService } from '@User/application/service/GetUser.service';
import { User } from '@User/domain/entity/User';
import { AutoSigninDto } from '../dto/AutoSignin.dto';

@Injectable()
export class AutoSigninService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly tokenRepository: TokenRepository
  ) {}
  public async run(dto: AutoSigninDto): Promise<SigninResponseType | undefined> {
    const refreshToken: string = await this.tokenRepository.getRefreshToken(
      dto.username
    );
    if (!refreshToken || refreshToken !== dto.refresh_token) throw new SigninException('Unauthorized', null, {});
    const user: User = await this.getUserService.run({
      username: dto.username,
    });
    return {
      client_id: user.clientId,
      client_secret: decryptStr(user.clientSecret, user.password),
      refresh_token: refreshToken,
    };
  }
}

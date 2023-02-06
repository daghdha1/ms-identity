import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserService } from '@User/application/service/GetUser.service';
import { User } from '@User/domain/entity/User';
import { GetAccessTokenDto } from '../dto/GetAccessToken.dto';
import { decryptStr } from 'pkg-shared';
import { TokenException } from '@Authentication/domain/exception/TokenException';
import { jwtConstants } from '@Authentication/authentication.constants';
import { JwtDataType } from '@Authentication/domain/types/JwtData.type';
import { AccessTokenResponseType } from '@Authentication/domain/types/AccessTokenResponse.type';

@Injectable()
export class GetAccessTokenService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly jwtService: JwtService
  ) {}

  public async run(dto: GetAccessTokenDto): Promise<AccessTokenResponseType> {
    const jwtData: JwtDataType = await this.validateUser(
      dto.client_id,
      dto.client_secret
    );
    if (!jwtData) throw new TokenException('Incorrect credentials', null, null);
    const response: AccessTokenResponseType = {
      access_token: this.createAccessToken(jwtData),
      token_type: 'Bearer',
      expires_in: Number(jwtConstants.expires_in),
    };
    return response;
  }

  private async validateUser(
    clientId: string,
    clientSecret: string
  ): Promise<JwtDataType | undefined> {
    const user: User = await this.getUserService.run({ client_id: clientId });
    if (!user || !this.isValidClientSecret(clientSecret, user))
      return undefined;
    return { uid: user.uid, username: user.username };
  }

  private isValidClientSecret(clientSecret: string, user: User): boolean {
    const clientSecretDecrypted: string = decryptStr(
      user.clientSecret,
      user.password
    );
    return clientSecret === clientSecretDecrypted;
  }

  private createAccessToken(userData: JwtDataType): string {
    const payload = { username: userData.username, sub: userData.uid };
    return this.jwtService.sign(payload);
  }
}

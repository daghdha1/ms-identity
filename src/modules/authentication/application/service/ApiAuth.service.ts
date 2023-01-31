import { Injectable } from '@nestjs/common';
import { AuthUserDataType } from '@Authentication/domain/types/AuthUserData.type';
import { TokenResponseType } from '@Authentication/domain/types/TokenResponse.type';
import { JwtService } from '@nestjs/jwt';
import { GetUserService } from '@User/application/service/GetUser.service';
import { User } from '@User/domain/entity/User';
import { TokenDto } from '../dto/Token.dto';
import { decryptStr } from '@Shared/utils/Encryption';
import { ApiAuthException } from '@Authentication/domain/exception/ApiAuthException';
import { TokenRepository } from '@Authentication/domain/repository/Token.repository';
import { jwtConstants } from '@Authentication/authentication.constants';

@Injectable()
export class ApiAuthService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly jwtService: JwtService,
    private readonly tokenRepository: TokenRepository
  ) {}

  public async run(dto: TokenDto): Promise<TokenResponseType> {
    const userData: AuthUserDataType = await this.validateUser(
      dto.client_id,
      dto.client_secret
    );

    let accessToken: string = await this.tokenRepository.getAccessToken(
      dto.client_id
    );
    if (!accessToken) {
      accessToken = this.createAccessToken(userData);
      const isSaved: boolean = await this.saveAccessToken(dto.client_id, accessToken);
      if (!isSaved) throw new ApiAuthException('An authentication error has ocurred', null, null);
    }

    return {
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: Number(jwtConstants.expires_in),
    };
  }

  private async validateUser(
    clientId: string,
    clientSecret: string
  ): Promise<AuthUserDataType> {
    const user: User = await this.getUserService.run({ client_id: clientId });
    if (!user || !this.isValidClientSecret(clientSecret, user))
      throw new ApiAuthException('Incorrect credentials', null, null);
    return {
      uid: user.uid,
      username: user.username,
    };
  }

  private isValidClientSecret(clientSecret: string, user: User): boolean {
    const clientSecretDecrypted: string = decryptStr(
      user.clientSecret,
      user.password
    );
    return clientSecret === clientSecretDecrypted;
  }

  private createAccessToken(userData: AuthUserDataType): string {
    const payload = { username: userData.username, sub: userData.uid };
    return this.jwtService.sign(payload);
  }

  private revokeAccessToken() {
    return null;
  }

  private async saveAccessToken(
    clientId: string,
    accessToken: string
  ): Promise<boolean> {
    return this.tokenRepository.saveAccessToken(
      clientId,
      accessToken
    );
  }
}

/* const clientSecretDecrypted: string = decryptStrWithCrypto(
    clientSecretEncrypted,
    pwStretched
  ); */

import { Injectable } from '@nestjs/common';
import { AuthUserDataType } from '@Authentication/domain/types/AuthUserData.type';
import { TokenResponseType } from '@Authentication/domain/types/TokenResponse.type';
import { JwtService } from '@nestjs/jwt';
import { GetUserService } from '@User/application/service/GetUser.service';
import { User } from '@User/domain/entity/User';
import { ApiAuthDto } from '../dto/ApiAuth.dto';
import { decryptStr } from '@Shared/utils/Encryption';
import { ApiAuthException } from '@Authentication/domain/exception/ApiAuthException';

@Injectable()
export class ApiService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly jwtService: JwtService
  ) {}

  public async run(dto: ApiAuthDto): Promise<TokenResponseType> {
    const userData: AuthUserDataType = await this.validateUser(
      dto.client_id,
      dto.client_secret
    );
    // TODO: Apply gran_type logic to retrieve tokens at first time or from refresh_token ??
    return {
      access_token: this.createAccessToken(userData),
      refresh_token: this.createRefreshToken(),
      token_type: 'Bearer',
      expires_in: 3600,
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
    console.log('client secret input: ' + clientSecret);
    const clientSecretDecrypted: string = decryptStr(
      user.clientSecret,
      user.password
    );
    console.log('client secret decrypted: ' + clientSecretDecrypted);
    return clientSecret === clientSecretDecrypted;
  }

  private createAccessToken(authUser: AuthUserDataType): string {
    const payload = { username: authUser.username, sub: authUser.uid };
    return this.jwtService.sign(payload);
  }

  private revokeAccessToken() {
    return null;
  }

  public createRefreshToken() {
    return 'empty';
  }
}

/* const clientSecretDecrypted: string = decryptStrWithCrypto(
    clientSecretEncrypted,
    pwStretched
  ); */

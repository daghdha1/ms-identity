import { Injectable } from '@nestjs/common';
/* import { AuthUserDataType } from '@Authentication/domain/types/AuthUserData.type';
import { TokenResponseType } from '@Authentication/domain/types/TokenResponse.type';
import { JwtService } from '@nestjs/jwt';
import { GetUserService } from '@User/application/service/GetUser.service';
import { User } from '@User/domain/entity/User';
import { TokenDto } from '../dto/Token.dto'; */

@Injectable()
export class TokenService {
  constructor(
    /* private readonly getUserService: GetUserService,
    private readonly jwtService: JwtService */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) {}

  /* public async run(dto: TokenDto): Promise<TokenResponseType> {
    const auth: AuthUserDataType = await this.validateUser(
      dto.client_id,
      dto.client_secret,
      dto.grant_type
    );
    return null;
     {
      //TODO: agregar propiedades para TokenDto
      access_token: this.createAccessToken(auth),
      refresh_token: this.createRefreshToken(),
    }; 
  }

  private async validateUser(
    apiKey: string,
    grantType: string
  ): Promise<AuthUserDataType> {
    const user: User = await this.getUserService.run({ username });
    if (!user || user.apiKey !== apiKey)
      throw new Error('Incorrect credentials'); //TODO: Devolver error
    return {
      id: user.id,
      username: user.username,
    };
  }

  private createAccessToken(authUser: AuthUserDataType): string {
    const payload = { username: authUser.username, sub: authUser.id };
    return this.jwtService.sign(payload);
  } */

  private revokeAccessToken() {
    return null;
  }

  public createRefreshToken() {
    return null;
  }
}

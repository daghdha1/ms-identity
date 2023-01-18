import { AuthUserDataType } from '@Authentication/domain/types/AuthUserData';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserService } from '@User/application/service/GetUser.service';
import { User } from '@User/domain/entity/User';
import { LoginDto } from '../dto/Login.dto';

@Injectable()
export class GetAccessTokenService {
  constructor(
    private readonly getUserService: GetUserService,
    private readonly jwtService: JwtService
  ) {}

  public async run(dto: LoginDto): Promise<string> {
    const authUserData: AuthUserDataType = await this.validateUserCredentials(
      dto.username,
      dto.password
    );
    const accessToken: string = this.createAccessToken(authUserData);
    return accessToken;
  }

  private async validateUserCredentials(
    username: string,
    password: string
  ): Promise<AuthUserDataType> {
    const user: User = await this.getUserService.run({ username });
    console.log(user);

    if (!user || user.password !== password) throw new Error('Incorrect User'); //TODO: Devolver error de login incorrecto

    return {
      id: user.id,
      username: user.username,
    };
  }

  private createAccessToken(authUser: AuthUserDataType): string {
    const payload = { username: authUser.username, sub: authUser.id };
    return this.jwtService.sign(payload);
  }
}

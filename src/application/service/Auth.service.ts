import { LoginDto } from '@application/dto/Login.dto';
import { User } from '@domain/entity/User';
import { AuthUserType } from '@domain/types/AuthUser';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetUserService } from './GetUser.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly getUserService: GetUserService,
    private jwtTokenService: JwtService,
  ) {}

  public async run(dto: LoginDto): Promise<string> {
    const authUser: AuthUserType = await this.validateUserCredentials(
      dto.username,
      dto.password,
    );
    const accessToken: string = this.createAccessToken(authUser);
    return accessToken;
  }

  private async validateUserCredentials(
    username: string,
    password: string,
  ): Promise<AuthUserType> {
    const user: User = await this.getUserService.run(username, password);

    if (!user || user.password !== password) throw new Error(); //TODO: Devolver error de login incorrecto

    return {
      id: user.id,
      username: user.username,
    };
  }

  private createAccessToken(authUser: AuthUserType): string {
    const payload = { username: authUser.username, sub: authUser.id };
    return this.jwtTokenService.sign(payload);
  }
}

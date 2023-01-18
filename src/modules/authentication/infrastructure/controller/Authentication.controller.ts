import { LoginDto } from '@Authentication/application/dto/Login.dto';
import { GetAccessTokenService } from '@Authentication/application/service/GetAccessToken.service';
import { JwtGuard } from '@Authentication/jwt.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BaseHttpResponse } from '@Shared/response/BaseHttp.response';
import { LoginResponseDto } from '../dto/LoginResponse.dto';

@Controller('authentication')
export class AuthenticationController extends BaseHttpResponse {
  constructor(private readonly tokenService: GetAccessTokenService) {
    super();
  }

  @Post('login')
  public async login(@Body() dto: LoginDto) {
    const response: LoginResponseDto = {
      accessToken: await this.tokenService.run(dto),
    };
    return this.success(response);
  }

  @UseGuards(JwtGuard)
  @Get('resource')
  public getResource() {
    return 'Este es el recurso protegido!';
  }
}

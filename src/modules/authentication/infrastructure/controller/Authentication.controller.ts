import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SigninDto } from '@Authentication/application/dto/Signin.dto';
import { SignupDto } from '@Authentication/application/dto/Signup.dto';
import { GetAccessTokenDto } from '@Authentication/application/dto/GetAccessToken.dto';
import { JwtGuard } from '@Authentication/jwt.guard';
import { SignupService } from '@Authentication/application/service/Signup.service';
import { SigninService } from '@Authentication/application/service/Signin.service';
import { GetAccessTokenService } from '@Authentication/application/service/GetAccessToken.service';
import { AutoSigninService } from '@Authentication/application/service/AutoSignin.service';
import { AutoSigninDto } from '@Authentication/application/dto/AutoSignin.dto';
import { SigninResponseDto } from '../dto/SigninResponse.dto';
import { AccessTokenResponseDto } from '../dto/AccessTokenResponse.dto';
import { BaseHttpResponse } from 'pkg-shared';

@Controller('auth')
export class AuthenticationController extends BaseHttpResponse {
  constructor(
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
    private readonly getAccessTokenService: GetAccessTokenService,
    private readonly autoSigninService: AutoSigninService
  ) {
    super();
  }

  @Post('signup')
  public async signup(@Body() dto: SignupDto) {
    const response: boolean = await this.signupService.run(dto);
    return this.success(response);
  }

  @Post('autoSignin')
  public async autoSignin(@Body() dto: AutoSigninDto) {
    const response: SigninResponseDto = await this.autoSigninService.run(dto);
    return this.success(response);
  }

  @Post('signin')
  public async signin(@Body() dto: SigninDto) {
    const response: SigninResponseDto = await this.signinService.run(dto);
    return this.success(response);
  }

  @Post('getAccessToken')
  public async getAccessToken(@Body() dto: GetAccessTokenDto) {
    const response: AccessTokenResponseDto =
      await this.getAccessTokenService.run(dto);
    return this.success(response);
  }

  @UseGuards(JwtGuard)
  @Get('resource')
  public getResource() {
    return 'Este es el recurso protegido!!!!';
  }
}

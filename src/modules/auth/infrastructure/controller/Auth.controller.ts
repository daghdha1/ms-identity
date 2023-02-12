import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AccessTokenResponseDto } from '../dto/AccessTokenResponse.dto';
import { BaseHttpResponse } from 'pkg-shared';
import { SigninService } from '@Auth/application/service/Signin.service';
import { SignupService } from '@Auth/application/service/Signup.service';
import { GetAccessTokenService } from '@Auth/application/service/GetAccessToken.service';
import { SignupDto } from '@Auth/application/dto/Signup.dto';
import { GetAccessTokenDto } from '@Auth/application/dto/GetAccessToken.dto';
import { SigninGuard } from '@Auth/_common/guards/signin.guard';
//import { LoggedinResponseDto } from '../dto/LoggedinResponse.dto';
import { LoggedinService } from '@Auth/application/service/Loggedin.service';
import { LoggedinGuard } from '@Auth/_common/guards/loggedin.guard';
import { LoggedinResponseDto } from '../dto/LoggedinResponse.dto';

@Controller('auth')
export class AuthController extends BaseHttpResponse {
  constructor(
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
    private readonly loggedinService: LoggedinService,
    private readonly getAccessTokenService: GetAccessTokenService
  ) {
    super();
  }

  @Post('signup')
  public async signup(@Body() dto: SignupDto) {
    const response: boolean = await this.signupService.run(dto);
    return this.success(response);
  }

  @UseGuards(SigninGuard)
  @Post('signin')
  public async signin(@Req() req) {
    const response: LoggedinResponseDto = await this.signinService.run(
      req.user
    );
    return this.success(response);
  }

  @UseGuards(LoggedinGuard)
  @Post('loggedin')
  public async loggedin(@Req() req) {
    const response: LoggedinResponseDto = await this.loggedinService.run(
      req.user
    );
    return this.success(response);
  }

  @Post('getAccessToken')
  public async getAccessToken(@Body() dto: GetAccessTokenDto) {
    const response: AccessTokenResponseDto =
      await this.getAccessTokenService.run(dto);
    return this.success(response);
  }

  /* @UseGuards(JwtGuard)
  @Get('resource')
  public getResource() {
    return 'Este es el recurso protegido!!!!';
  } */
}

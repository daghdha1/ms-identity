import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SigninDto } from '@Authentication/application/dto/Signin.dto';
import { SignupDto } from '@Authentication/application/dto/Signup.dto';
//import { TokenDto } from '@Authentication/application/dto/Token.dto';
//import { TokenService } from '@Authentication/application/service/Token.service';
//import { TokenResponseDto } from '@Authentication/infrastructure/dto/TokenResponse.dto';
import { JwtGuard } from '@Authentication/jwt.guard';
import { BaseHttpResponse } from '@Shared/response/BaseHttp.response';
import { SignupService } from '@Authentication/application/service/Signup.service';
import { SigninService } from '@Authentication/application/service/Signin.service';

@Controller('auth')
export class AuthenticationController extends BaseHttpResponse {
  constructor(
    private readonly signupService: SignupService,
    private readonly signinService: SigninService
  ) //private readonly tokenService: TokenService
  {
    super();
  }

  @Post('signup')
  public async signup(@Body() dto: SignupDto) {
    const response: boolean = await this.signupService.run(dto);
    return this.success(response);
  }

  @Post('signin')
  public async signin(@Body() dto: SigninDto) {
    const response: boolean = await this.signinService.run(dto);
    return this.success(response);
  }

  /* @Post('token')
  public async token(@Body() dto: TokenDto) {
    const response: TokenResponseDto = await this.tokenService.run(dto);
    return this.success(response);
  } */

  @UseGuards(JwtGuard)
  @Get('resource')
  public getResource() {
    return 'Este es el recurso protegido!!!!';
  }
}

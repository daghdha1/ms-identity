import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SigninDto } from '@Authentication/application/dto/Signin.dto';
import { SignupDto } from '@Authentication/application/dto/Signup.dto';
import { ApiAuthDto } from '@Authentication/application/dto/ApiAuth.dto';
import { TokenResponseDto } from '@Authentication/infrastructure/dto/TokenResponse.dto';
import { JwtGuard } from '@Authentication/jwt.guard';
import { BaseHttpResponse } from '@Shared/response/BaseHttp.response';
import { SignupService } from '@Authentication/application/service/Signup.service';
import { SigninService } from '@Authentication/application/service/Signin.service';
import { ApiService } from '@Authentication/application/service/Api.service';

@Controller('auth')
export class AuthenticationController extends BaseHttpResponse {
  constructor(
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
    private readonly apiService: ApiService
  ) {
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

  @Post('api')
  public async api(@Body() dto: ApiAuthDto) {
    const response: TokenResponseDto = await this.apiService.run(dto);
    return this.success(response);
  }

  @UseGuards(JwtGuard)
  @Get('resource')
  public getResource() {
    return 'Este es el recurso protegido!!!!';
  }
}

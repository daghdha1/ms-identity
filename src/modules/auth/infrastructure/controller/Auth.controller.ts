import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { LoggedinGuard } from '@Auth/_common/guards/loggedin.guard'
import { SigninGuard } from '@Auth/_common/guards/signin.guard'
import { ApiAuthGuard } from '@Auth/_common/guards/api-auth.guard'
import { SignupDto } from '@Auth/application/dto/Signup.dto'
import { SignupService } from '@Auth/application/service/Signup.service'
import { SigninService } from '@Auth/application/service/Signin.service'
import { LoggedinService } from '@Auth/application/service/Loggedin.service'
import { GenerateTokenService } from '@Auth/application/service/GenerateToken.service'
import { BaseHttpResponse } from 'pkg-shared'
import { LoggedinResponseDto } from '../dto/LoggedinResponse.dto'
import { GenerateTokenResponseDto } from '../dto/GenerateTokenResponse.dto'
import { JwtGuard } from '@Auth/_common/guards/jwt.guard'

@Controller('auth')
export class AuthController extends BaseHttpResponse {
  constructor(
    private readonly signupService: SignupService,
    private readonly signinService: SigninService,
    private readonly loggedinService: LoggedinService,
    private readonly generateTokenService: GenerateTokenService
  ) {
    super()
  }

  @Post('signup')
  public async signup(@Body() dto: SignupDto) {
    const response: boolean = await this.signupService.run(dto)
    return this.success(response)
  }

  @UseGuards(SigninGuard)
  @Post('signin')
  public async signin(@Req() req) {
    const response: LoggedinResponseDto = await this.signinService.run(req.user)
    return this.success(response)
  }

  @UseGuards(LoggedinGuard)
  @Post('loggedin')
  public async loggedin(@Req() req) {
    const response: LoggedinResponseDto = await this.loggedinService.run(req.user)
    return this.success(response)
  }

  @UseGuards(ApiAuthGuard)
  @Post('token')
  public async generateToken(@Req() req) {
    const response: GenerateTokenResponseDto = await this.generateTokenService.run(req.user)
    return this.success(response)
  }

  @UseGuards(JwtGuard)
  @Post('checkAccess')
  public checkUserAccess() {
    return 'OK'
  }
}

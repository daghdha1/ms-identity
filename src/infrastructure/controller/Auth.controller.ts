import { AuthenticateUserDto } from '@application/internal/dto/AuthenticateUser.dto';
import { LoginUserDto } from '@application/internal/dto/LoginUser.dto';
import { AuthenticateUserService } from '@application/internal/service/AuthenticateUser.service';
import { LoginUserService } from '@application/internal/service/LoginUser.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginUserService,
    private readonly authService: AuthenticateUserService,
  ) {}

  @Post('login')
  public loginUser(@Body() dto: LoginUserDto) {
    return this.loginService.run(dto);
  }

  @Post('authenticate')
  public authenticateUser(@Body() dto: AuthenticateUserDto) {
    return this.authService.run(dto);
  }
}

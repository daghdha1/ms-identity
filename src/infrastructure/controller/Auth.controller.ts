import { LoginDto } from '@application/dto/Login.dto';
import { AuthService } from '@application/service/Auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public login(@Body() dto: LoginDto) {
    return this.authService.run(dto);
  }

  /*   @Post('authenticate')
  public authenticateUser(@Body() dto: any) {
    return this.authService.run(dto);
  } */
}

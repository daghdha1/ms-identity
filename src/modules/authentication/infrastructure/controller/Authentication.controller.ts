import { LoginDto } from '@Authentication/application/dto/Login.dto';
import { GetAccessTokenService } from '@Authentication/application/service/GetAccessToken.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly getAccessToken: GetAccessTokenService) {}

  @Post('login')
  public login(@Body() dto: LoginDto) {
    console.log(dto);
    return this.getAccessToken.run(dto);
  }
}

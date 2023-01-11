import { GetUserDto } from '@application/dto/GetUser.dto';
import { GetUserService } from '@application/service/GetUser.service';
import { Body, Controller, Get } from '@nestjs/common';

@Controller('identity')
export class IdentityController {
  constructor(private readonly getUserService: GetUserService) {}

  @Get('getUser')
  public getUser(@Body() dto: GetUserDto): boolean {
    return this.getUserService.run(dto);
  }
}

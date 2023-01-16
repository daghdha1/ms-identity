import { Body, Controller, Get } from '@nestjs/common';
import { GetUserDto } from '@User/application/dto/GetUser.dto';
import { GetUserService } from '@User/application/service/GetUser.service';
import { User } from '@User/domain/entity/User';

@Controller('user')
export class UserController {
  constructor(private readonly service: GetUserService) {}

  @Get('getUser')
  public getUser(@Body() dto: GetUserDto): Promise<User> {
    return this.service.run(dto.username, dto.password);
  }
}

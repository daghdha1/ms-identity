import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controller/User.controller';
import { GetUserService } from './application/service/GetUser.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [GetUserService],
  exports: [GetUserService],
})
export class UserModule {}

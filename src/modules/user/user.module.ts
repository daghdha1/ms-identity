import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controller/User.controller';
import { GetUserService } from './application/service/GetUser.service';
import { UserRepository } from './domain/repository/User.repository';
import { UserMysqlRepository } from './infrastructure/persistence/database/mysql/repository/UserMysql.repository';
import { CreateUserService } from './application/service/CreateUser.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    GetUserService,
    CreateUserService,
    {
      provide: UserRepository,
      useClass: UserMysqlRepository,
    },
  ],
  exports: [GetUserService, CreateUserService],
})
export class UserModule {}

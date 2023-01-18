import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controller/User.controller';
import { GetUserService } from './application/service/GetUser.service';
import { UserRepository } from './domain/repository/User.repository';
import { UserMysqlRepository } from './infrastructure/persistence/database/mysql/repository/UserMysql.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    GetUserService,
    {
      provide: UserRepository,
      useClass: UserMysqlRepository,
    },
  ],
  exports: [GetUserService],
})
export class UserModule {}

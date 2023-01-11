import { AuthService } from '@application/service/Auth.service';
import { GetUserService } from '@application/service/GetUser.service';
import { AuthController } from '@infrastructure/controller/Auth.controller';
import { IdentityController } from '@infrastructure/controller/Identity.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './app.constants';

@Module({
  controllers: [AuthController, IdentityController],
  providers: [AuthService, GetUserService],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [],
})
export class AppModule {}

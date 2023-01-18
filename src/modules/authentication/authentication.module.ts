import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@User/user.module';
import { GetAccessTokenService } from './application/service/GetAccessToken.service';
import { jwtConstants } from './authentication.constants';
import { AuthenticationController } from './infrastructure/controller/Authentication.controller';

import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [GetAccessTokenService, JwtStrategy],
  exports: [GetAccessTokenService],
})
export class AuthenticationModule {}

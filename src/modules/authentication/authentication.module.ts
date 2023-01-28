import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@User/user.module';
import { ApiService } from './application/service/Api.service';
import { SigninService } from './application/service/Signin.service';
import { SignupService } from './application/service/Signup.service';
import { jwtConstants } from './authentication.constants';
import { AuthenticationController } from './infrastructure/controller/Authentication.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [SignupService, SigninService, ApiService, JwtStrategy],
  exports: [],
})
export class AuthenticationModule {}

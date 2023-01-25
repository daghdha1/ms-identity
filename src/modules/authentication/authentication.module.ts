import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@User/user.module';
import { SigninService } from './application/service/Signin.service';
import { SignupService } from './application/service/Signup.service';
//import { TokenService } from './application/service/Token.service';
import { jwtConstants } from './authentication.constants';
import { AuthenticationController } from './infrastructure/controller/Authentication.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '86400s' },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [SignupService, SigninService, JwtStrategy],
  exports: [],
})
export class AuthenticationModule {}

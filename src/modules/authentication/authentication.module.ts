import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@User/user.module';
import { AutoSigninService } from './application/service/AutoSignin.service';
import { GetAccessTokenService } from './application/service/GetAccessToken.service';
import { SigninService } from './application/service/Signin.service';
import { SignupService } from './application/service/Signup.service';
import { jwtConstants } from './authentication.constants';
import { TokenRepository } from './domain/repository/Token.repository';
import { AuthenticationController } from './infrastructure/controller/Authentication.controller';
import { TokenRedisRepository } from './infrastructure/persistence/database/redis/TokenRedis.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `${jwtConstants.expires_in}s` },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [
    SignupService,
    SigninService,
    AutoSigninService,
    GetAccessTokenService,
    JwtStrategy,
    {
      provide: TokenRepository,
      useClass: TokenRedisRepository,
    },
  ],
  exports: [],
})
export class AuthenticationModule {}

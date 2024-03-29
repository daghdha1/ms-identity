import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '@User/user.module'
import { AuthService } from './application/service/Auth.service'
import { LoggedinService } from './application/service/Loggedin.service'
import { GenerateTokenService } from './application/service/GenerateToken.service'
import { SigninService } from './application/service/Signin.service'
import { SignupService } from './application/service/Signup.service'
import { jwtConstants } from './auth.constants'
import { TokenRepository } from './domain/repository/Token.repository'
import { AuthController } from './infrastructure/controller/Auth.controller'
import { TokenRedisRepository } from './infrastructure/persistence/database/redis/TokenRedis.repository'
import { JwtStrategy } from './_common/guards/jwt.strategy'
import { SigninStrategy } from './_common/guards/signin.strategy'
import { LoggedinStrategy } from './_common/guards/loggedin.strategy'
import { ApiAuthStrategy } from './_common/guards/api-auth.strategy'
import { KafkaModule } from 'pkg-shared'

@Module({
  imports: [
    UserModule,
    KafkaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `${jwtConstants.expires_in}s` }
    })
  ],
  controllers: [AuthController],
  providers: [
    SigninStrategy,
    LoggedinStrategy,
    ApiAuthStrategy,
    JwtStrategy,
    AuthService,
    SignupService,
    SigninService,
    LoggedinService,
    GenerateTokenService,
    {
      provide: TokenRepository,
      useClass: TokenRedisRepository
    }
  ],
  exports: []
})
export class AuthModule {}

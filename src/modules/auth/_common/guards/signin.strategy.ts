import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '@Auth/application/service/Auth.service'

@Injectable()
export class SigninStrategy extends PassportStrategy(Strategy, 'local-signin') {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUserSignin(username, password)
    if (!user) throw new UnauthorizedException()
    return user
  }
}

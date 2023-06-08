import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-custom'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '@Auth/application/service/Auth.service'

@Injectable()
export class LoggedinStrategy extends PassportStrategy(Strategy, 'custom-loggedin') {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(request: any): Promise<any> {
    const body = request.body
    if (!body.username || !body.session_token) throw new BadRequestException()
    const user = await this.authService.validateUserLoggedin(body.username, body.session_token)
    if (!user) throw new UnauthorizedException()
    return user
  }
}

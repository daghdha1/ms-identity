import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '@Auth/application/service/Auth.service';

@Injectable()
export class ApiAuthStrategy extends PassportStrategy(Strategy, 'custom-api-auth') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(request: any): Promise<any> {
    console.log(request)
    const body = request.body;
    console.log(body);
    if (!body.client_id || !body.client_secret) throw new BadRequestException();
    const user = await this.authService.validateUserApi(
      body.client_id,
      body.client_secret
    );
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

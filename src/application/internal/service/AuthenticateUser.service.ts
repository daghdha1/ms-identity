import { Injectable } from '@nestjs/common';
import { AuthenticateUserDto } from '../dto/AuthenticateUser.dto';

@Injectable()
export class AuthenticateUserService {
  public run(dto: AuthenticateUserDto): boolean {
    return true;
  }
}

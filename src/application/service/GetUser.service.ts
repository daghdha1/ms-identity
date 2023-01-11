import { User } from '@domain/entity/User';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserService {
  public async run(username: string, password: string): Promise<User> {
    const user: User = new User();
    // conectar con mongo y devolver el usuario que matchea
    return user;
  }
}

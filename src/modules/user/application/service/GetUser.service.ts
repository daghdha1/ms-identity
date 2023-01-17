import { Injectable } from '@nestjs/common';
import { User } from '@User/domain/entity/User';

@Injectable()
export class GetUserService {
  public async run(username: string, password: string): Promise<User> {
    const user: User = new User();
    // conectar con mongo y devolver el usuario que matchea
    //const client = await getMongoClient();

    return user;
  }
}

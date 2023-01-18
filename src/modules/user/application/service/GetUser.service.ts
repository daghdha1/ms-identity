import { Injectable } from '@nestjs/common';
import { User } from '@User/domain/entity/User';
import { UserRepository } from '@User/domain/repository/User.repository';
import { GetUserDto } from '../dto/GetUser.dto';

@Injectable()
export class GetUserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async run(dto: GetUserDto): Promise<User> {
    const user: User = await this.userRepo.getUser(dto.username);
    return user;
  }
}

import { Injectable } from '@nestjs/common';
import { User } from '@User/domain/entity/User';
import { UserRepository } from '@User/domain/repository/User.repository';
import { GetUserDto } from '../dto/GetUser.dto';

@Injectable()
export class GetUserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async run(dto: GetUserDto): Promise<User> {
    let user: User = null;
    if (dto.username) user = await this.userRepo.getUserByName(dto.username);
    else user = await this.userRepo.getUserByClientId(dto.client_id);
    return user;
  }
}

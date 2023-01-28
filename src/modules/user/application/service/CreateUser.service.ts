import { Injectable } from '@nestjs/common';
import { User } from '@User/domain/entity/User';
import { UserRepository } from '@User/domain/repository/User.repository';
import { CreateUserDto } from '../dto/CreateUser.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async run(dto: CreateUserDto): Promise<boolean> {
    const user: User = User.create(dto);
    const isUserCreated: boolean = await this.userRepo.createUser(user);
    return isUserCreated;
  }
}

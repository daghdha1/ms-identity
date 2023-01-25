import { Injectable } from '@nestjs/common';
import { UserRepository } from '@User/domain/repository/User.repository';
import { CreateUserDto } from '../dto/CreateUser.dto';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async run(dto: CreateUserDto): Promise<boolean> {
    console.log(dto);
    // TODO: Pass this obj to entity and pass to repo to save it
    //const isUserCreated: boolean = await this.userRepo.createUser(user);
    return null;
  }
}

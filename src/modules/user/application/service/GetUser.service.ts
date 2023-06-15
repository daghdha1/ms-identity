import { Injectable } from '@nestjs/common'
import { User } from '@User/domain/entity/User'
import { UserRepository } from '@User/domain/repository/User.repository'
import { GetUserDto } from '../dto/GetUser.dto'

@Injectable()
export class GetUserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async run(dto: GetUserDto): Promise<User | undefined> {
    if (dto.username) {
      return this.userRepo.getUserByName(dto.username)
    }
    return this.userRepo.getUserByClientId(dto.client_id)
  }
}

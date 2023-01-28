import { LoginException } from '@Authentication/domain/exception/LoginException';
import { Injectable } from '@nestjs/common';
import { compareStrWithStrHashed } from '@Shared/utils/Encryption';
import { GetUserService } from '@User/application/service/GetUser.service';
import { User } from '@User/domain/entity/User';
import { SigninDto } from '../dto/Signin.dto';

@Injectable()
export class SigninService {
  constructor(private readonly getUserService: GetUserService) {}

  public async run(dto: SigninDto): Promise<any> {
    try {
      const user: User = await this.getUserService.run({
        username: dto.username,
      });
      const isValidPassword: boolean = await compareStrWithStrHashed(
        dto.password,
        user.password
      );
      return isValidPassword;
    } catch (error) {
      throw new LoginException('Login error', 'POST', null, {});
    }
  }
}

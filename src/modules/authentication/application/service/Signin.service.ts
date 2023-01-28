import { SigninException } from '@Authentication/domain/exception/SigninException';
import { Injectable } from '@nestjs/common';
import { compareStrWithStrHashed } from '@Shared/utils/Encryption';
import { GetUserService } from '@User/application/service/GetUser.service';
import { User } from '@User/domain/entity/User';
import { SigninDto } from '../dto/Signin.dto';

@Injectable()
export class SigninService {
  constructor(private readonly getUserService: GetUserService) {}

  //TODO: Hay que devolver el client_id y el client_secret al usuario
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
      throw new SigninException('Login error', 'POST', null, {});
    }
  }
}

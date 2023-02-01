import { Injectable } from '@nestjs/common';
import { CreateUserService } from '@User/application/service/CreateUser.service';
import { SignupDto } from '../dto/Signup.dto';

import { CreateUserDto } from '@User/application/dto/CreateUser.dto';
import {
  hashStr,
  encryptStr,
  generateRandomHex,
} from '@Shared/utils/Encryption';

@Injectable()
export class SignupService {
  constructor(private readonly createUserService: CreateUserService) {}

  public async run(dto: SignupDto): Promise<boolean> {
    const pwHashed: string = await hashStr(dto.password);
    const clientId = generateRandomHex(32);
    const clientSecret = generateRandomHex(32);
    const clientSecretEncrypted: string = encryptStr(clientSecret, pwHashed);

    const payload: CreateUserDto = {
      client_id: clientId,
      client_secret: clientSecretEncrypted,
      username: dto.username,
      password: pwHashed,
      organization_name: dto.organization_name,
      phone: dto.phone,
      email: dto.email,
    };
    const isUserRegistered: boolean = await this.createUserService.run(payload);
    return isUserRegistered;
  }
}

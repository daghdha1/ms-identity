import { Injectable } from '@nestjs/common';
import { CreateUserService } from '@User/application/service/CreateUser.service';
import { SignupDto } from '../dto/Signup.dto';

import { CreateUserDto } from '@User/application/dto/CreateUser.dto';
import {
  decryptStrWithCrypto,
  encryptStrWithBcrypt,
  encryptStrWithCrypto,
  generateRandomHex,
  stretchStr,
} from '@Shared/utils/Encryption';

@Injectable()
export class SignupService {
  constructor(private readonly createUserService: CreateUserService) {}

  public async run(dto: SignupDto): Promise<boolean> {
    console.log(dto);
    // Generate encrypted password
    // utf-8 (weak pass) --> stretchString(Buffer 32 bytes) --> hex --> hash
    const pwStretched: string = stretchStr(dto.password, 32).toString('hex', 0, 32);
    console.log(pwStretched.length);
    const pwEncrypted: string = await encryptStrWithBcrypt(pwStretched);
    console.log('Password hash with bcrypt: ' + pwEncrypted);
    // TODO: Save encrypted password in database

    // Generate new clientId and clientSecret
    const clientId = generateRandomHex(16);
    const clientSecret = generateRandomHex(16);
    // Encrypt clientSecret with stretched password
    const clientSecretEncrypted: string = encryptStrWithCrypto(
      clientSecret,
      pwStretched
    );
    // TODO: Save encrypted clientSecret in database

    const clientSecretDecrypted: string = decryptStrWithCrypto(
      clientSecretEncrypted,
      pwStretched
    );
    console.log('ClientId: ' + clientId);
    console.log('ClientSecret: ' + clientSecret);
    console.log('ClientSecret encrypted: ' + clientSecretEncrypted);
    console.log('ClientSecret decrypted: ' + clientSecretDecrypted);
    const payload: CreateUserDto = {
      client_id: clientId,
      client_secret: clientSecret,
      username: dto.username,
      encrypted_password: pwEncrypted,
      organization_name: dto.organization_name,
      phone: dto.phone,
      email: dto.email,
    };
    const isUserRegistered: boolean = await this.createUserService.run(payload);
    return isUserRegistered;
  }
}

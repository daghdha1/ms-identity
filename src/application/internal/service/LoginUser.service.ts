import { Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dto/LoginUser.dto';

@Injectable()
export class LoginUserService {
  public run(dto: LoginUserDto): boolean {
    // With courier string, get the carrier code from map table
    // gls --> GLS
    // select the notification platform
    // [telegram,email] --> [TELEGRAM, EMAIL]
    // With destinationCountryIso3 match the ISO 3166 international standard
    // es/ES or esp/ESP matches with ES or ESP
    // With languageIso3 match the ISO 639-3 standard
    // en/EN or eng/ENG matches with EN or ENG
    return true;
  }
}

import { IsString } from 'class-validator';

export class AutoSigninDto {
  @IsString()
  username: string;
  @IsString()
  refresh_token: string;
}

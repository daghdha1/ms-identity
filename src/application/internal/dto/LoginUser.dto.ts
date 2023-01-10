import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  username: any;
  @IsString()
  password: any;
}

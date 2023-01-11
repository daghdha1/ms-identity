import { IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}

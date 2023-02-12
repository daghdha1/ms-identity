import { IsString } from 'class-validator';

export class SignupDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  organization_name: string;
  @IsString()
  phone: string;
  @IsString()
  email: string;
}

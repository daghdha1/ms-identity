import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsNumber()
  uid?: number;
  @IsString()
  client_id: string;
  @IsString()
  client_secret: string;
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

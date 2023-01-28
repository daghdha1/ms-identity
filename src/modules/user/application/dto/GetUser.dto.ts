import { IsOptional, IsString } from 'class-validator';

export class GetUserDto {
  @IsOptional()
  @IsString()
  username?: string;
  @IsOptional()
  @IsString()
  client_id?: string;
}

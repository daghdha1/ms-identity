import { IsOptional, IsString } from 'class-validator';

export class ApiAuthDto {
  @IsString()
  client_id: string;
  @IsString()
  client_secret: string;
  @IsOptional()
  @IsString()
  grant_type?: string;
}

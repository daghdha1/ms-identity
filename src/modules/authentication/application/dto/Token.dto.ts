import { IsString } from 'class-validator';

export class TokenDto {
  @IsString()
  client_id: string;
  @IsString()
  client_secret: string;
  @IsString()
  grant_type: string;
}

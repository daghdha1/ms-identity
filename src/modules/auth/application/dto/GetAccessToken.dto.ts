import { IsString } from 'class-validator'

export class GetAccessTokenDto {
  @IsString()
  client_id: string
  @IsString()
  client_secret: string
}

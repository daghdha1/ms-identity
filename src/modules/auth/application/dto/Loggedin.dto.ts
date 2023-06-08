import { IsString } from 'class-validator'

export class LoggedinDto {
  @IsString()
  username: string
  @IsString()
  sessionToken: string
}

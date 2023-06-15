import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@User/domain/entity/User'
import { GenerateTokenResponseType } from '@Auth/domain/types/GenerateTokenResponse.type'
import { jwtConstants } from '@Auth/auth.constants'

@Injectable()
export class GenerateTokenService {
  constructor(private readonly jwtService: JwtService) {}

  public async run(user: User): Promise<GenerateTokenResponseType> {
    return {
      access_token: this.createAccessToken(user.uid, user.username),
      token_type: 'Bearer',
      expires_in: Number(jwtConstants.expires_in)
    }
  }

  private createAccessToken(uid: number, username: string): string {
    const payload = { username, sub: uid }
    return this.jwtService.sign(payload)
  }
}

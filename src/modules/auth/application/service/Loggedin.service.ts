import { Injectable } from '@nestjs/common'
import { decryptStr } from 'pkg-shared'
import { User } from '@User/domain/entity/User'
import { LoggedinResponseType } from '@Auth/domain/types/LoggedinResponse.type'

@Injectable()
export class LoggedinService {
  public async run(user: User): Promise<LoggedinResponseType> {
    return {
      client_id: user.clientId,
      client_secret: decryptStr(user.clientSecret, user.password)
    }
  }
}

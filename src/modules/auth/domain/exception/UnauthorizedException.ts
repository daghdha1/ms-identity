import { BaseException } from 'pkg-shared'

export class UnauthorizedException extends BaseException {
  constructor(readonly message: string, method: string, headers: any, body = {}) {
    super(`${message} [METHOD=${method}] [HEADERS=${JSON.stringify(headers)}] [body=${body}]`, null, null, 401)
  }
}

import { BaseException } from '@Shared/exception/Base.exception';

export class SigninException extends BaseException {
  constructor(
    readonly message: string,
    method: string,
    headers: any,
    body = {}
  ) {
    super(
      `${message} [METHOD=${method}] [HEADERS=${JSON.stringify(
        headers
      )}] [body=${body}]`,
      null,
      401
    );
  }
}

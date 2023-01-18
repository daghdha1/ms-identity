import { BaseException } from './Base.exception';

export class HttpRequestException extends BaseException {
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
      404
    );
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class SigninService {
  public async run(dto: any): Promise<any> {
    return dto;
  }
}

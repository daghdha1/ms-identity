import { Injectable } from '@nestjs/common';
import { CorreosExpressHookDto } from '../dto/CorreosExpressHook.dto';

@Injectable()
export class CorreosExpressHookService {
  public run(dto: CorreosExpressHookDto): boolean {
    console.log(dto);
    // get data
    return true;
  }
}

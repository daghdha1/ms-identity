import { Injectable } from '@nestjs/common';
import { GlsHookDto } from '../dto/GlsHook.dto';

@Injectable()
export class GlsHookService {
  public run(dto: GlsHookDto): boolean {
    // get data
    return true;
  }
}

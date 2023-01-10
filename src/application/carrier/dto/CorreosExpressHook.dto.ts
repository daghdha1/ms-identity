import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { HookDataDto } from './HookData.dto';
import { HookReferencesDto } from './HookReferences.dto';

export class CorreosExpressHookDto {
  @IsString()
  event: string;
  @IsString()
  eventId: string;
  @IsString()
  timestamp: string;
  @Type(() => HookReferencesDto)
  references: HookReferencesDto;
  @Type(() => HookDataDto)
  data: HookDataDto;
}

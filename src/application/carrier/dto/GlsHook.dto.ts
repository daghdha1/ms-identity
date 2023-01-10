import { HookDataDto } from './HookData.dto';
import { HookReferencesDto } from './HookReferences.dto';

export class GlsHookDto {
  event: string;
  eventId: string;
  timestamp: string;
  references: HookReferencesDto;
  data: HookDataDto;
}

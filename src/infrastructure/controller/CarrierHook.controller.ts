import { CorreosExpressHookDto } from '@application/carrier/dto/CorreosExpressHook.dto';
import { DhlHookDto } from '@application/carrier/dto/DhlHook.dto';
import { GlsHookDto } from '@application/carrier/dto/GlsHook.dto';
import { CorreosExpressHookService } from '@application/carrier/service/CorreosExpressHook.service';
import { DhlHookService } from '@application/carrier/service/DhlHook.service';
import { GlsHookService } from '@application/carrier/service/GlsHook.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('carrier/hook')
export class CarrierHookController {
  constructor(
    private readonly correosExpressHookService: CorreosExpressHookService,
    private readonly glsHookService: GlsHookService,
    private readonly dhlHookService: DhlHookService,
  ) {}

  @Post('correos-express')
  public correosExpressHook(@Body() dto: CorreosExpressHookDto): boolean {
    return this.correosExpressHookService.run(dto);
  }

  @Post('gls')
  public glsHook(@Body() dto: GlsHookDto): boolean {
    return this.glsHookService.run(dto);
  }

  @Post('dhl')
  public dhlHook(@Body() dto: DhlHookDto): boolean {
    return this.dhlHookService.run(dto);
  }
}

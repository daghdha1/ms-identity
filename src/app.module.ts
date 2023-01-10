import { CorreosExpressHookService } from '@application/carrier/service/CorreosExpressHook.service';
import { DhlHookService } from '@application/carrier/service/DhlHook.service';
import { GlsHookService } from '@application/carrier/service/GlsHook.service';
import { CreateTrackingService } from '@application/client/service/Tracking.service';
import { CarrierHookController } from '@infrastructure/controller/CarrierHook.controller';
import { TrackingController } from '@infrastructure/controller/Tracking.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TrackingController, CarrierHookController],
  providers: [
    CreateTrackingService,
    CorreosExpressHookService,
    GlsHookService,
    DhlHookService,
  ],
})
export class AppModule {}

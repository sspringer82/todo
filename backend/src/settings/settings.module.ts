import { Module } from '@nestjs/common';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService]
})
export class SettingsModule {}

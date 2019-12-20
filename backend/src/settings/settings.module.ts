import { Module } from '@nestjs/common';
import { SettingsController } from './settings/settings.controller';
import { SettingsService } from './settings/settings.service';
import { Settings } from './settings/settings.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Settings])],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}

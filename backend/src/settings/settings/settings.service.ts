import { Injectable } from '@nestjs/common';
import { Settings } from './settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>
  ) {}

  getByUserId(id: number) {
    return this.settingsRepository.findOne({ where: { userId: id } });
  }

  async save(settings: Settings) {
    const existingSettings = await this.getByUserId(settings.user.id);
    if (existingSettings) {
      settings.id = existingSettings.id;
    }
    return this.settingsRepository.save(settings);
  }
}

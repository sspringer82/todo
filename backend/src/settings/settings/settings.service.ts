import { Injectable } from '@nestjs/common';
import { Settings } from './settings.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
  ) {}

  async getByUserId(id: number) {
    const userSettings = await this.settingsRepository.findOne({
      where: { user: id },
      relations: ['list'],
    });
    if (userSettings) {
      return userSettings;
    }
    return {
      hideDone: false,
      onlyStars: false,
    };
  }

  save(settings: Settings) {
    if (!settings.list) {
      settings.list = null;
    }
    return this.settingsRepository.save(settings);
  }
}

import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Req() request) {
    const result = await this.settingsService.getByUserId(request.user.id);
    return result;
  }
}

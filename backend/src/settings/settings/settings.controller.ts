import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AuthGuard } from '@nestjs/passport';
import { Settings } from './settings.entity';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(@Req() request) {
    return this.settingsService.getByUserId(request.user.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  save(@Body() settings: Settings, @Req() request) {
    return this.settingsService.save(settings);
  }
}

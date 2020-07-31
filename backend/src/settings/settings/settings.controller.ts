import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { AuthGuard } from '@nestjs/passport';
import { Settings } from './settings.entity';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  getAll(@Req() request) {
    return this.settingsService.getByUserId(request.user.id);
  }

  @Post()
  save(@Body() settings: Settings, @Req() request) {
    settings.user = request.user;
    return this.settingsService.save(settings);
  }

  @Put(':id')
  async update(@Body() settings: Settings, @Req() request) {
    const savedSettings = await this.settingsService.getByUserId(
      request.user.id,
    );
    return this.settingsService.save({
      ...savedSettings,
      ...settings,
      ...{ user: request.user },
    });
  }
}

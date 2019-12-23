import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
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
    settings.user = request.user;
    return this.settingsService.save(settings);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() settings: Settings, @Req() request) {
    const savedSettings = await this.settingsService.getByUserId(
      request.user.id
    );
    if (
      (savedSettings as Settings).id &&
      (savedSettings as Settings).id === settings.id
    ) {
      return this.settingsService.save(settings);
    } else {
      throw new UnauthorizedException();
    }
  }
}

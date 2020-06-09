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
import { ApiTags } from '@nestjs/swagger';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Settings')
  getAll(@Req() request) {
    return this.settingsService.getByUserId(request.user.id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Settings')
  save(@Body() settings: Settings, @Req() request) {
    settings.user = request.user;
    return this.settingsService.save(settings);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Settings')
  async update(@Body() settings: Settings, @Req() request) {
    const savedSettings = await this.settingsService.getByUserId(
      request.user.id,
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

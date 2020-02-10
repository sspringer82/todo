import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChangesService } from './changes.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('changes')
export class ChangesController {
  constructor(private readonly changesService: ChangesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Changes')
  applyChanges(@Body() changes: any[]) {
    return this.changesService.applyChanges(changes);
  }
}

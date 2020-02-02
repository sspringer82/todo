import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChangesService } from './changes.service';

@Controller('changes')
export class ChangesController {
  constructor(private readonly changesService: ChangesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  applyChanges(@Body() changes: any[]) {
    return this.changesService.applyChanges(changes);
  }
}

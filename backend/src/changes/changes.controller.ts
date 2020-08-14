import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChangesService } from './changes.service';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Changes')
@Controller('changes')
export class ChangesController {
  constructor(private readonly changesService: ChangesService) {}

  @Post()
  applyChanges(@Body() changes: any[], @Req() request) {
    const user = request.user;
    return this.changesService.applyChanges(changes, user);
  }
}

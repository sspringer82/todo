import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ListService } from './list.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(@Req() request) {
    return this.listService.getAll();
  }
}

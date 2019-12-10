import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { ListService } from './list.service';
import { AuthGuard } from '@nestjs/passport';
import { List } from './list.entity';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll(@Req() request) {
    return this.listService.getAll(request.user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() list: List, @Req() request) {
    const listToBeSaved = { ...list, creator: request.user };
    return this.listService.save(listToBeSaved);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Body() list: List) {
    return this.listService.save(list);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    this.listService.remove(parseInt(id, 10));
  }
}

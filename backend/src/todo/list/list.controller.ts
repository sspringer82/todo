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
  UnauthorizedException,
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
    const listToBeSaved = List.create({ ...list, creator: request.user });
    return this.listService.save(listToBeSaved);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Body() list: List, @Req() request) {
    if (this.listService.isAllowedToModify(request.user.id, list.id)) {
      return this.listService.save(list);
    }
    throw UnauthorizedException;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Req() request) {
    const listId = parseInt(id, 10);
    if (this.listService.isAllowedToModify(request.user.id, listId)) {
      return this.listService.remove(listId);
    }
    throw UnauthorizedException;
  }
}

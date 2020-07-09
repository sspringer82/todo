import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
  Put,
  UnauthorizedException,
  Delete,
  Param,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { TodoService } from '../todo/todo.service';
import { AuthGuard } from '@nestjs/passport';
import { SubtaskService } from './subtask.service';
import { Subtask } from './subtask.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('subtask')
export class SubtaskController {
  constructor(
    private readonly subtaskService: SubtaskService,
    private readonly todoService: TodoService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Subtask')
  create(@Body() subtask: Subtask) {
    return this.subtaskService.save(subtask);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Subtask')
  update(@Body() subtask: Subtask, @Req() request) {
    if (this.todoService.isAllowedToModify(request.user.id, subtask.todo.id)) {
      return this.subtaskService.save(subtask);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Subtask')
  async remove(@Param('id') id: string, @Req() request) {
    const subtaskId = parseInt(id, 10);
    const subtask = await this.subtaskService.getOne(subtaskId);
    if (!subtask.todo) {
      throw new BadRequestException('No Todo reference provided');
    }
    if (
      await this.todoService.isAllowedToModify(request.user.id, subtask.todo.id)
    ) {
      await this.subtaskService.remove(subtaskId);
    } else {
      throw new UnauthorizedException();
    }
  }
}

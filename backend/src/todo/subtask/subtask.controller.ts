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
} from '@nestjs/common';
import { TodoService } from '../todo/todo.service';
import { AuthGuard } from '@nestjs/passport';
import { SubtaskService } from './subtask.service';
import { Subtask } from './subtask.entity';

@Controller('subtask')
export class SubtaskController {
  constructor(
    private readonly subtaskService: SubtaskService,
    private readonly todoService: TodoService
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() subtask: Subtask) {
    return this.subtaskService.save(subtask);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Body() subtask: Subtask, @Req() request) {
    if (this.todoService.isAllowedToModify(request.user.id, subtask.todo.id)) {
      return this.subtaskService.save(subtask);
    }
    throw new UnauthorizedException();
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Req() request) {
    const subtaskId = parseInt(id, 10);
    const subtask = await this.subtaskService.getOne(subtaskId);
    if (this.todoService.isAllowedToModify(request.user.id, subtask.todo.id)) {
      this.subtaskService.remove(subtaskId);
    }
    throw new UnauthorizedException();
  }
}

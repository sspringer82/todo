import {
  Controller,
  Get,
  Put,
  Body,
  Post,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAll() {
    return this.todoService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() todo: Todo) {
    return this.todoService.save(todo);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Body() todo: Todo) {
    return this.todoService.save(todo);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    this.todoService.remove(parseInt(id, 10));
  }
}

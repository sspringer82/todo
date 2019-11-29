import {
  Controller,
  Get,
  Put,
  Body,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAll() {
    return this.todoService.getAll();
  }

  @Post()
  create(@Body() todo: Todo) {
    return this.todoService.save(todo);
  }

  @Put(':id')
  update(@Body() todo: Todo) {
    return this.todoService.save(todo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.todoService.remove(parseInt(id, 10));
  }
}

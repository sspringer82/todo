import {
  Controller,
  Get,
  Put,
  Body,
  Post,
  Delete,
  Param,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAll(@Req() request) {
    const result = await this.todoService.getAll(request.user);
    return result;
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() todo: Todo, @Req() request) {
    const todoToBeSaved = { ...todo, creator: request.user };
    return this.todoService.save(Todo.create(todoToBeSaved));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Body() todo: Todo, @Req() request) {
    if (this.todoService.isAllowedToModify(request.user.id, todo.id)) {
      return this.todoService.save(todo);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Req() request) {
    const todoId = parseInt(id, 10);
    if (this.todoService.isAllowedToModify(request.user.id, todoId)) {
      return this.todoService.remove(todoId);
    } else {
      throw new UnauthorizedException();
    }
  }
}

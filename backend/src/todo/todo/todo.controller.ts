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
import update from 'immutability-helper';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Get a list of all todos.',
    type: [Todo],
  })
  async getAll(@Req() request): Promise<Todo[]> {
    return this.todoService.getAll(request.user);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() todo: Todo, @Req() request) {
    const todoToBeSaved = update(todo, {
      creator: { $set: request.user },
    });
    // is allowed to create in List?
    return this.todoService.save(Todo.create(todoToBeSaved));
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async update(@Body() todo: Todo, @Req() request) {
    if (await this.todoService.isAllowedToModify(request.user.id, todo.id)) {
      return this.todoService.save(todo);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Req() request) {
    const todoId = parseInt(id, 10);
    if (await this.todoService.isAllowedToModify(request.user.id, todoId)) {
      return this.todoService.remove(todoId);
    } else {
      throw new UnauthorizedException();
    }
  }
}

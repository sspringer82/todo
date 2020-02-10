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
  HttpCode,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { AuthGuard } from '@nestjs/passport';
import update from 'immutability-helper';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

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
  @ApiTags('Todo')
  async getAll(@Req() request): Promise<Todo[]> {
    return this.todoService.getAll(request.user);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    description: 'Create a new todo.',
    type: Todo,
  })
  @ApiTags('Todo')
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
  @ApiOkResponse({
    description: 'Update an existing todo.',
    type: Todo,
  })
  @ApiTags('Todo')
  async update(@Param('id') id: string, @Body() todo: Todo, @Req() request) {
    if (await this.todoService.isAllowedToModify(request.user.id, todo.id)) {
      return this.todoService.save(todo);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Delete a todo' })
  @ApiTags('Todo')
  async remove(@Param('id') id: string, @Req() request) {
    const todoId = parseInt(id, 10);
    if (await this.todoService.isAllowedToModify(request.user.id, todoId)) {
      await this.todoService.remove(todoId);
    } else {
      throw new UnauthorizedException();
    }
  }
}

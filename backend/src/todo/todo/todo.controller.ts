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
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('Todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get a list of all todos.',
    type: [Todo],
  })
  async getAll(@Req() request): Promise<Todo[]> {
    return this.todoService.getAll(request.user);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create a new todo.',
    type: Todo,
  })
  create(@Body() todo: Todo, @Req() request) {
    const todoToBeSaved = update(todo, {
      creator: { $set: request.user },
    });
    // is allowed to create in List?
    return this.todoService.save(Todo.create(todoToBeSaved));
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update an existing todo.',
    type: Todo,
  })
  async update(@Param('id') id: string, @Body() todo: Todo, @Req() request) {
    if (await this.todoService.isAllowedToModify(request.user.id, todo.id)) {
      return this.todoService.save(todo);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Delete a todo' })
  async remove(@Param('id') id: string, @Req() request) {
    const todoId = parseInt(id, 10);
    if (await this.todoService.isAllowedToModify(request.user.id, todoId)) {
      await this.todoService.remove(todoId);
    } else {
      throw new UnauthorizedException();
    }
  }
}

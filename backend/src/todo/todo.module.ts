import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo/todo.entity';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { List } from './list/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, List])],
  controllers: [TodoController, ListController],
  providers: [TodoService, ListService],
})
export class TodoModule {}

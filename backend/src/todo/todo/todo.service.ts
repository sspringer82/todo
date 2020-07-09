import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { User } from '../../user/user/user.entity';
import { List } from '../list/list.entity';
import { Subtask } from '../subtask/subtask.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async getAll(user: User) {
    const { raw, entities } = await this.todoRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('list', 'l', 'todo.listId = l.id')
      .leftJoinAndSelect('subtask', 's', 'todo.id = s.todoId')
      .leftJoin('list_shared_with_user', 'lu', 'l.id = lu.listId')
      .leftJoin('user', 'u', 'lu.userId = u.id')
      .where('todo.creator = :creator', { creator: user.id })
      .orWhere('l.creator = :creator', { creator: user.id })
      .orWhere('u.id = :sharedWith', { sharedWith: user.id })
      .getRawAndEntities();

    const todosWithList = raw
      .filter((rawTodo) => rawTodo.l_id !== null)
      .reduce((prev, current) => {
        prev[current.todo_id] = current;
        return prev;
      }, {});

    const subtasks = raw
      .filter((rawTodo) => rawTodo.s_id !== null)
      .reduce((prev, current) => {
        prev[current.s_id] = Subtask.create({
          id: current.s_id,
          title: current.s_title,
          done: !!current.s_done,
          createdAt: current.s_createdAt,
          updatedAt: current.s_updatedAt,
          todo: { id: current.s_todoId },
        });
        return prev;
      }, {});

    const subtasksToTodos = Object.values(subtasks).reduce(
      (prev, current: Subtask) => {
        if (prev[current.todo.id]) {
          prev[current.todo.id].push(current);
        } else {
          prev[current.todo.id] = [current];
        }
        return prev;
      },
      {},
    );

    const enrichedTodos = entities.map((todoEntity) => {
      if (todosWithList[todoEntity.id]) {
        const l = todosWithList[todoEntity.id];
        todoEntity.list = List.create({
          id: l.l_id,
          name: l.l_name,
          createdAt: l.l_createdAt,
          updatedAt: l.l_updatedAt,
        });
      }
      if (subtasksToTodos[todoEntity.id]) {
        todoEntity.subtasks = subtasksToTodos[todoEntity.id];
      }
      return todoEntity;
    });

    return enrichedTodos;
  }

  getOne(id: number) {
    return this.todoRepository.findOne({ id });
  }

  save(todo: Todo) {
    return this.todoRepository.save(todo);
  }

  async remove(id: number) {
    return (await this.getOne(id)).remove();
  }

  async isAllowedToModify(userId: number, todoId: number) {
    return (
      (
        await this.todoRepository
          .createQueryBuilder('todo')
          .leftJoin('list', 'list', 'todo.listId = list.id')
          .leftJoin('list_shared_with_user', 'lu', 'list.id = lu.listId')
          .leftJoin('user', 'u', 'lu.userId = u.id')
          .where('todo.id = :todoId', { todoId })
          .andWhere('(todo.creatorId = :userId OR u.id = :userId)', {
            userId,
          })
          .getMany()
      ).length > 0
    );
  }
}

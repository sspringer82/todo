import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}

  getAll(user: User) {
    return this.todoRepository.find({ where: { creator: user } });
  }

  getOne(id: number) {
    return this.todoRepository.findOne({ id });
  }

  save(todo: Todo) {
    return this.todoRepository.save(todo);
  }

  async remove(id: number) {
    return this.todoRepository.remove(await this.getOne(id));
  }
}

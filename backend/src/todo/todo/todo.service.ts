import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}

  getAll() {
    return this.todoRepository.find();
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

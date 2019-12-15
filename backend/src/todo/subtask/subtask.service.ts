import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from '../todo/todo.entity';
import { Repository } from 'typeorm';
import { Subtask } from './subtask.entity';

@Injectable()
export class SubtaskService {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtaskRepository: Repository<Subtask>
  ) {}

  getOne(id: number) {
    return this.subtaskRepository.findOne({ id }, { relations: ['todo'] });
  }

  save(subtask: Subtask) {
    return this.subtaskRepository.save(subtask);
  }

  async remove(id: number) {
    return (await this.getOne(id)).remove();
  }
}

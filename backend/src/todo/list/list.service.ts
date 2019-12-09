import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>
  ) {}

  getAll() {
    return this.listRepository.find({ relations: ['sharedWith'] });
  }

  getOne(id: number) {
    return this.listRepository.findOne({ id });
  }

  save(list: List) {
    return this.listRepository.save(list);
  }

  async remove(id: number) {
    const list = await this.getOne(id);
    return this.listRepository.remove(list);
  }
}

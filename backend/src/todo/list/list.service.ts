import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from './list.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user/user.entity';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List) private readonly listRepository: Repository<List>
  ) {}

  getAll(currentUser: User) {
    return this.listRepository
      .createQueryBuilder('list')
      .leftJoinAndSelect('list_shared_with_user', 'lu', 'list.id = lu.listId')
      .leftJoinAndSelect('user', 'u', 'lu.userId = u.id')
      .where('list.creator = :creator', { creator: currentUser.id })
      .orWhere('u.id = :sharedWith', { sharedWith: currentUser.id })
      .getMany();

    return this.listRepository.find({
      where: [{ creator: currentUser }, { sharedWith: currentUser }],
      relations: ['sharedWith'],
    });
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

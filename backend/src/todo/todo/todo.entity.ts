import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { User } from '../../user/user/user.entity';
import { List } from '../list/list.entity';
import { Subtask } from '../subtask/subtask.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column('text')
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  done: boolean;

  @Column({ nullable: true, default: null })
  @ApiProperty()
  due: Date;

  @Column({ default: 0 })
  @ApiProperty()
  starred: boolean;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(
    type => User,
    user => user.todos,
    { nullable: true, onDelete: 'SET NULL' }
  )
  @ApiProperty()
  creator: User;

  @ManyToOne(
    type => List,
    list => list.todos,
    { nullable: true, onDelete: 'SET NULL' }
  )
  @ApiProperty()
  list: List;

  @OneToMany(
    type => Subtask,
    subtask => subtask.todo
  )
  @ApiProperty()
  subtasks: Subtask[];
}

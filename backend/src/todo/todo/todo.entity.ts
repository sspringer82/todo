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

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column()
  done: boolean;

  @Column({ nullable: true, default: null })
  due: Date;

  @Column({ default: 0 })
  starred: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    type => User,
    user => user.todos,
    { nullable: true, onDelete: 'SET NULL' }
  )
  creator: User;

  @ManyToOne(
    type => List,
    list => list.todos,
    { nullable: true, onDelete: 'SET NULL' }
  )
  list: List;

  @OneToMany(
    type => Subtask,
    subtask => subtask.todo
  )
  subtasks: Subtask[];
}

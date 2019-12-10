import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Todo } from '../todo/todo.entity';
import { User } from 'src/user/user/user.entity';
@Entity()
export class List {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @OneToMany(
    type => Todo,
    todo => todo.list
  )
  todos: Todo[];

  @ManyToMany(type => User, { nullable: true })
  @JoinTable()
  sharedWith: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(type => User, { nullable: true, onDelete: 'SET NULL' })
  creator: User;
}

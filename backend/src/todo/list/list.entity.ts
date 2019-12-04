import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Todo } from '../todo/todo.entity';
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
}

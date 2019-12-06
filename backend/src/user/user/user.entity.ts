import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Todo } from 'src/todo/todo/todo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  username: string;

  @Column('text', { nullable: true })
  firstname: string;

  @Column('text', { nullable: true })
  lastname: string;

  @Column('text')
  password: string;

  @OneToMany(
    type => Todo,
    todo => todo.creator
  )
  todos: Todo[];
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/user/user/user.entity';

@Entity()
export class Todo {
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
    user => user.todos
  )
  creator: User;
}

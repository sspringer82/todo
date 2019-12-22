import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/user/user/user.entity';
import { List } from 'src/todo/list/list.entity';
@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  hideDone: boolean;

  @Column({ default: 0 })
  onlyStars: boolean;

  @ManyToOne(
    type => List,
    list => list.todos,
    { nullable: true, onDelete: 'SET NULL' }
  )
  list: List;

  @OneToOne(
    type => User,
    user => user.settings
  )
  @JoinColumn()
  user: User;
}

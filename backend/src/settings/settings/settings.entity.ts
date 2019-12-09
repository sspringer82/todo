import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/user/user.entity';
@Entity()
export class Settings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @OneToOne(
    type => User,
    user => user.settings
  )
  @JoinColumn()
  user: User;
}

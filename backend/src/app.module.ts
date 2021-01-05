import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';
import { ChangesModule } from './changes/changes.module';

import { config } from 'dotenv';
config();

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      type: 'sqlite',
      database: process.env.DATABASE,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: false,
      migrations: ['dist/migrations/*{.ts,.js}'],
      migrationsRun: true,
      cli: {
        migrationsDir: 'src/migrations',
      },
    }),
    UserModule,
    SettingsModule,
    ChangesModule,
  ],
})
export class AppModule {}

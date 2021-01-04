import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';
import { ChangesModule } from './changes/changes.module';

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({ keepConnectionAlive: true, database: process.env.DATABASE }),
    UserModule,
    SettingsModule,
    ChangesModule,
  ],
})
export class AppModule {}

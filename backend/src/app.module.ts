import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    TodoModule,
    TypeOrmModule.forRoot({ keepConnectionAlive: true }),
    UserModule,
    SettingsModule,
  ],
})
export class AppModule {}

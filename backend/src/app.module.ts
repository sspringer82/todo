import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TodoModule, TypeOrmModule.forRoot({ keepConnectionAlive: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

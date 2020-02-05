import { Module } from '@nestjs/common';
import { ChangesController } from './changes.controller';
import { ChangesService } from './changes.service';
import { TodoModule } from '../todo/todo.module';
import { SettingsModule } from '../settings/settings.module';

@Module({
  controllers: [ChangesController],
  providers: [ChangesService],
  imports: [TodoModule, SettingsModule],
})
export class ChangesModule {}

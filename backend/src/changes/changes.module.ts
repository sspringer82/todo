import { Module } from '@nestjs/common';
import { ChangesController } from './changes.controller';
import { ChangesService } from './changes.service';

@Module({
  controllers: [ChangesController],
  providers: [ChangesService],
})
export class ChangesModule {}

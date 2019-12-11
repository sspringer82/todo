import { Test, TestingModule } from '@nestjs/testing';
import { SubtaskController } from './subtask.controller';

describe('Subtask Controller', () => {
  let controller: SubtaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubtaskController],
    }).compile();

    controller = module.get<SubtaskController>(SubtaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

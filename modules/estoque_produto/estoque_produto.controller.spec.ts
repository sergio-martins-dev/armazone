import { Test, TestingModule } from '@nestjs/testing';
import { EstoqueProdutoController } from './estoque_produto.controller';

describe('EstoqueProdutoController', () => {
  let controller: EstoqueProdutoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstoqueProdutoController],
    }).compile();

    controller = module.get<EstoqueProdutoController>(EstoqueProdutoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

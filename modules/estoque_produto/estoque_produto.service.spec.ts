import { Test, TestingModule } from '@nestjs/testing';
import { EstoqueProdutoService } from './estoque_produto.service';

describe('EstoqueProdutoService', () => {
  let service: EstoqueProdutoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstoqueProdutoService],
    }).compile();

    service = module.get<EstoqueProdutoService>(EstoqueProdutoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

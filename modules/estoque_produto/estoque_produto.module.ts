import { Module } from '@nestjs/common';
import { EstoqueProdutoService } from './estoque_produto.service';
import { EstoqueProdutoController } from './estoque_produto.controller';

@Module({
  providers: [EstoqueProdutoService],
  controllers: [EstoqueProdutoController]
})
export class EstoqueProdutoModule {}

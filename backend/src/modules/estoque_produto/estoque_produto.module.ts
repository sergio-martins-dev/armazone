import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueProdutoEntity } from '../../entities/estoque_produto.entity';
import { EstoqueProdutoService } from './estoque_produto.service';
import { EstoqueProdutoController } from './estoque_produto.controller';
import { EstoqueEntity } from '../../entities/estoque.entity';
import { ProdutoEntity } from '../../entities/produto.entity';
import { EstoquesModule } from '../estoques/estoques.module';
import { ProdutosModule } from '../produtos/produtos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstoqueProdutoEntity,
      EstoqueEntity,
      ProdutoEntity,
    ]),
    EstoquesModule,
    ProdutosModule,
  ],
  providers: [EstoqueProdutoService],
  controllers: [EstoqueProdutoController],
})
export class EstoqueProdutoModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueProdutoEntity } from '../../entities/estoque_produto.entity';
import { EstoqueProdutoService } from './estoque_produto.service';
import { EstoqueProdutoController } from './estoque_produto.controller';
import { EstoqueEntity } from '../../entities/estoque.entity';
import { ProdutoEntity } from '../../entities/produto.entity';
import { EstoquesModule } from '../estoques/estoques.module';
import { ProdutosModule } from '../produtos/produtos.module';
import { BaixaEstoqueEntity } from 'src/entities/baixa_estoque.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EstoqueProdutoEntity,
      EstoqueEntity,
      ProdutoEntity,
      BaixaEstoqueEntity,
    ]),
    EstoquesModule,
    ProdutosModule,
  ],
  providers: [EstoqueProdutoService],
  controllers: [EstoqueProdutoController],
  exports: [EstoqueProdutoService],
})
export class EstoqueProdutoModule {}

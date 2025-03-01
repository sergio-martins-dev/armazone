import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendaEntity } from '../../entities/venda.entity';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { ProdutoEntity } from '../../entities/produto.entity';
import { ProdutosModule } from '../produtos/produtos.module';
import { EstoqueProdutoModule } from '../estoque_produto/estoque_produto.module';
import { BaixaEstoqueEntity } from 'src/entities/baixa_estoque.entity';
import { EstoqueProdutoEntity } from 'src/entities/estoque_produto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VendaEntity,
      ProdutoEntity,
      BaixaEstoqueEntity,
      EstoqueProdutoEntity,
    ]), // Registrar os repositórios
    ProdutosModule,
    EstoqueProdutoModule, // Importar o módulo de produtos
  ],
  providers: [VendasService],
  controllers: [VendasController],
})
export class VendasModule {}

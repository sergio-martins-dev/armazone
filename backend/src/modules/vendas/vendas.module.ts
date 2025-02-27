import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VendaEntity } from '../../entities/venda.entity';
import { VendasService } from './vendas.service';
import { VendasController } from './vendas.controller';
import { ProdutoEntity } from '../../entities/produto.entity';
import { ProdutosModule } from '../produtos/produtos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([VendaEntity, ProdutoEntity]), // Registrar os repositórios
    ProdutosModule, // Importar o módulo de produtos
  ],
  providers: [VendasService],
  controllers: [VendasController],
})
export class VendasModule {}

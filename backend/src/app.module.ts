import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProdutoEntity } from './entities/produto.entity';
import { EstoqueEntity } from './entities/estoque.entity';
import { EstoqueProdutoEntity } from './entities/estoque_produto.entity';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { EstoquesModule } from './modules/estoques/estoques.module';
import { EstoqueProdutoModule } from './modules/estoque_produto/estoque_produto.module';
import { VendasModule } from './modules/vendas/vendas.module';
import { VendaEntity } from './entities/venda.entity';
import { BaixaEstoqueEntity } from './entities/baixa_estoque.entity';
import { db } from 'config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: db.DB_HOST,
      port: Number(db.DB_PORT),
      username: db.DB_USERNAME,
      password: db.DB_PASSWORD,
      database: db.DB_NAME,
      entities: [
        ProdutoEntity,
        EstoqueEntity,
        EstoqueProdutoEntity,
        VendaEntity,
        BaixaEstoqueEntity,
      ],
      synchronize: true, // ⚠️ Apenas para dev, em produção use migrations
    }),
    ProdutosModule,
    EstoquesModule,
    EstoqueProdutoModule,
    VendasModule,
  ],
})
export class AppModule {}

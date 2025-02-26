import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProdutoEntity } from './entities/produto.entity';
import { EstoqueEntity } from './entities/estoque.entity';
import { EstoqueProdutoEntity } from './entities/estoque_produto.entity';
import { ProdutosModule } from './modules/produtos/produtos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [ProdutoEntity, EstoqueEntity, EstoqueProdutoEntity],
      synchronize: true, // ⚠️ Apenas para dev, em produção use migrations
    }),
    ProdutosModule,
  ],
})
export class AppModule {}

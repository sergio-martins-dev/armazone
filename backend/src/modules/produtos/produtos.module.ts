import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoEntity } from '../../entities/produto.entity';
import { ProdutosService } from './produtos.service';
import { ProdutosController } from './produtos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity])],
  providers: [ProdutosService],
  controllers: [ProdutosController],
})
export class ProdutosModule {}

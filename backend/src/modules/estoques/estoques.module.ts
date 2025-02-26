import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstoqueEntity } from '../../entities/estoque.entity';
import { EstoquesService } from './estoques.service';
import { EstoquesController } from './estoques.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EstoqueEntity])],
  providers: [EstoquesService],
  controllers: [EstoquesController],
})
export class EstoquesModule {}

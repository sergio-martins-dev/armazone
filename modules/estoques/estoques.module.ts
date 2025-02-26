import { Module } from '@nestjs/common';
import { EstoquesService } from './estoques.service';
import { EstoquesService } from './estoques.service';
import { EstoquesService } from './estoques.service';
import { EstoquesController } from './estoques.controller';
import { EstoquesController } from './estoques.controller';
import { EstoquesService } from './estoques.service';

@Module({
  providers: [EstoquesService],
  controllers: [EstoquesController]
})
export class EstoquesModule {}

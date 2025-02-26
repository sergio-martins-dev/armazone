import { Controller, Get, Post, Body } from '@nestjs/common';
import { EstoquesService } from './estoques.service';

@Controller('estoques')
export class EstoquesController {
  constructor(private readonly estoquesService: EstoquesService) {}

  @Get()
  listarTodos() {
    return this.estoquesService.listarTodos();
  }

  @Post()
  criarEstoque(@Body() body: { nome: string }) {
    return this.estoquesService.criarEstoque(body.nome);
  }
}

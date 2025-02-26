import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  listarTodos() {
    return this.produtosService.listarTodos();
  }

  @Post()
  criarProduto(@Body() body: { nome: string; preco: number }) {
    return this.produtosService.criarProduto(body.nome, body.preco);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProdutosService } from './produtos.service';

@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Get()
  listarTodos() {
    return this.produtosService.listarTodos();
  }

  @Post()
  criarProduto(
    @Body() body: { nome: string; preco: number; codigoBarras: string },
  ) {
    return this.produtosService.criarProduto(
      body.nome,
      body.preco,
      body.codigoBarras,
    );
  }

  @Patch(':codigoBarras')
  atualizarProduto(
    @Param('codigoBarras') codigoBarras: string,
    @Body() body: { nome?: string; preco?: number },
  ) {
    return this.produtosService.atualizarProduto(codigoBarras, body);
  }

  @Delete(':codigoBarras')
  deletarProduto(@Param('codigoBarras') codigoBarras: string) {
    return this.produtosService.deletarProduto(codigoBarras);
  }
}

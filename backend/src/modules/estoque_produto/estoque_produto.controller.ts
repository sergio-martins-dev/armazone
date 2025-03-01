import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { EstoqueProdutoService } from './estoque_produto.service';

@Controller('estoque-produto')
export class EstoqueProdutoController {
  constructor(private readonly estoqueProdutoService: EstoqueProdutoService) {}

  @Post()
  adicionarProdutoAoEstoque(
    @Body()
    body: {
      estoqueId: number;
      codigoBarras: string;
      quantidade: number;
    },
  ) {
    return this.estoqueProdutoService.adicionarProdutoAoEstoque(
      body.estoqueId,
      body.codigoBarras,
      body.quantidade,
    );
  }

  @Get(':estoqueId')
  listarProdutosDoEstoque(@Param('estoqueId') estoqueId: number) {
    return this.estoqueProdutoService.listarProdutosDoEstoque(estoqueId);
  }

  @Delete(':estoqueId/:codigoBarras')
  removerProdutoDoEstoque(
    @Param('estoqueId') estoqueId: number,
    @Param('codigoBarras') codigoBarras: string,
    @Body('motivo') motivo: string,
  ) {
    return this.estoqueProdutoService.removerProdutoDoEstoque(
      estoqueId,
      codigoBarras,
      motivo,
    );
  }

  @Post('dar-baixa')
  darBaixaNoEstoque(
    @Body()
    body: {
      estoqueId: number;
      codigoBarras: string;
      quantidade: number;
      motivo: string;
    },
  ) {
    return this.estoqueProdutoService.darBaixaNoEstoque(
      body.estoqueId,
      body.codigoBarras,
      body.quantidade,
      body.motivo,
    );
  }
}

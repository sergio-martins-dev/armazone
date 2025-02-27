import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { EstoqueProdutoService } from './estoque_produto.service';

@Controller('estoque-produto')
export class EstoqueProdutoController {
  constructor(private readonly estoqueProdutoService: EstoqueProdutoService) {}

  @Post()
  adicionarProdutoAoEstoque(
    @Body() body: { estoqueId: number; produtoId: number; quantidade: number },
  ) {
    return this.estoqueProdutoService.adicionarProdutoAoEstoque(
      body.estoqueId,
      body.produtoId,
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
  ) {
    return this.estoqueProdutoService.removerProdutoDoEstoque(
      estoqueId,
      codigoBarras,
    );
  }

  @Post('dar-baixa')
  darBaixaNoEstoque(
    @Body()
    body: {
      estoqueId: number;
      codigoBarras: string;
      quantidade: number;
    },
  ) {
    return this.estoqueProdutoService.darBaixaNoEstoque(
      body.estoqueId,
      body.codigoBarras,
      body.quantidade,
    );
  }
}

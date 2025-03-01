import { Controller, Post, Get, Query, Body, Param } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { EstoqueProdutoService } from '../estoque_produto/estoque_produto.service';

@Controller('vendas')
export class VendasController {
  constructor(
    private readonly vendasService: VendasService,
    private readonly estoqueProdutoService: EstoqueProdutoService,
  ) {}

  @Post()
  registrarVenda(
    @Body()
    body: {
      estoqueId: number;
      codigoBarras: string;
      quantidade: number;
      precoTotal: number;
    },
  ) {
    return this.vendasService.registrarVenda(
      body.estoqueId,
      body.codigoBarras,
      body.quantidade,
      body.precoTotal,
    );
  }

  @Get('relatorio')
  gerarRelatorio(
    @Query('dataInicial') dataInicial?: string,
    @Query('dataFinal') dataFinal?: string,
    @Query('estoqueId') estoqueId?: number,
    @Query('codigoBarras') codigoBarras?: string,
  ) {
    return this.vendasService.gerarRelatorio(
      dataInicial,
      dataFinal,
      estoqueId,
      codigoBarras,
    );
  }

  @Get('baixas/:estoqueId')
  async listarBaixas(@Param('estoqueId') estoqueId?: number) {
    return this.estoqueProdutoService.listarBaixas(estoqueId);
  }
}

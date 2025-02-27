import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { VendasService } from './vendas.service';

@Controller('vendas')
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

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
  ) {
    return this.vendasService.gerarRelatorio(dataInicial, dataFinal, estoqueId);
  }
}

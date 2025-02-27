import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { VendaEntity } from '../../entities/venda.entity';
import { ProdutoEntity } from '../../entities/produto.entity';

@Injectable()
export class VendasService {
  constructor(
    @InjectRepository(VendaEntity)
    private readonly vendaRepository: Repository<VendaEntity>,

    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  // Registrar uma nova venda com código de barras
  async registrarVenda(
    estoqueId: number,
    codigoBarras: string,
    quantidade: number,
    precoTotal: number,
  ) {
    const produto = await this.produtoRepository.findOne({
      where: { codigoBarras },
    });

    if (!produto) {
      throw new Error('Produto não encontrado.');
    }

    const venda = this.vendaRepository.create({
      estoque: { id: estoqueId },
      produto,
      quantidade,
      precoTotal,
    });

    return this.vendaRepository.save(venda);
  }

  // Relatório de vendas (opcionalmente filtrado por data e estoque)
  async gerarRelatorio(
    dataInicial?: string,
    dataFinal?: string,
    estoqueId?: number,
  ) {
    const where: any = {};

    if (dataInicial && dataFinal) {
      where.dataVenda = Between(new Date(dataInicial), new Date(dataFinal));
    }

    if (estoqueId) {
      where.estoque = { id: estoqueId };
    }

    return this.vendaRepository.find({ where });
  }
}

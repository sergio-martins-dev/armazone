import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstoqueProdutoEntity } from '../../entities/estoque_produto.entity';
import { EstoqueEntity } from '../../entities/estoque.entity';
import { ProdutoEntity } from '../../entities/produto.entity';
import { BaixaEstoqueEntity } from 'src/entities/baixa_estoque.entity';

@Injectable()
export class EstoqueProdutoService {
  constructor(
    @InjectRepository(EstoqueProdutoEntity)
    private readonly estoqueProdutoRepository: Repository<EstoqueProdutoEntity>,

    @InjectRepository(EstoqueEntity)
    private readonly estoqueRepository: Repository<EstoqueEntity>,

    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,

    @InjectRepository(BaixaEstoqueEntity)
    private baixaEstoqueRepository: Repository<BaixaEstoqueEntity>,
  ) {}

  // Adicionar produto a um estoque
  async adicionarProdutoAoEstoque(
    estoqueId: number,
    codigoBarras: string,
    quantidade: number,
  ) {
    const estoque = await this.estoqueRepository.findOne({
      where: { id: estoqueId },
    });
    const produto = await this.produtoRepository.findOne({
      where: { codigoBarras },
    });

    if (!estoque || !produto) {
      throw new Error('Estoque ou Produto não encontrado.');
    }

    let relacao = await this.estoqueProdutoRepository.findOne({
      where: { estoque: { id: estoqueId }, produto: { codigoBarras } },
    });

    if (relacao) {
      relacao.quantidade += quantidade;
    } else {
      relacao = this.estoqueProdutoRepository.create({
        estoque,
        produto,
        quantidade,
      });
    }

    return this.estoqueProdutoRepository.save(relacao);
  }

  // Listar produtos dentro de um estoque específico
  async listarProdutosDoEstoque(estoqueId: number) {
    return this.estoqueProdutoRepository.find({
      where: { estoque: { id: estoqueId } },
      relations: ['produto'],
    });
  }

  async removerProdutoDoEstoque(
    estoqueId: number,
    codigoBarras: string,
    motivo: string,
  ) {
    const produto = await this.produtoRepository.findOne({
      where: { codigoBarras },
    });

    if (!produto) {
      throw new Error('Produto não encontrado.');
    }

    const estoqueProduto = await this.estoqueProdutoRepository.findOne({
      where: { estoque: { id: estoqueId }, produto: { id: produto.id } },
    });

    if (!estoqueProduto) {
      throw new Error('Produto não encontrado no estoque.');
    }

    // 🔹 Salva o histórico de baixa antes de remover
    const baixa = this.baixaEstoqueRepository.create({
      estoque: { id: estoqueId },
      produto,
      quantidade: estoqueProduto.quantidade,
      motivo,
    });

    await this.baixaEstoqueRepository.save(baixa);

    // 🔹 Remove o produto do estoque
    await this.estoqueProdutoRepository.delete({
      estoque: { id: estoqueId },
      produto: { id: produto.id },
    });

    return { mensagem: 'Produto removido do estoque com sucesso.', baixa };
  }

  async darBaixaNoEstoque(
    estoqueId: number,
    codigoBarras: string,
    quantidade: number,
    motivo: string,
  ) {
    const produto = await this.produtoRepository.findOne({
      where: { codigoBarras },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    const relacao = await this.estoqueProdutoRepository.findOne({
      where: { estoque: { id: estoqueId }, produto: { id: produto.id } },
    });

    if (!relacao) {
      throw new NotFoundException('Produto não encontrado neste estoque.');
    }

    if (relacao.quantidade < quantidade) {
      throw new BadRequestException('Estoque insuficiente.');
    }

    // 🔹 Salva o histórico de baixa antes de remover
    const baixa = this.baixaEstoqueRepository.create({
      estoque: { id: estoqueId },
      produto,
      quantidade,
      motivo,
    });

    await this.baixaEstoqueRepository.save(baixa);

    relacao.quantidade -= quantidade;
    return this.estoqueProdutoRepository.save(relacao);
  }

  async listarBaixas(estoqueId?: number) {
    const baixas = await this.baixaEstoqueRepository.find({
      order: { dataBaixa: 'DESC' },
    });
    if (estoqueId)
      return baixas.filter((baixa) => baixa.estoque.id === Number(estoqueId));
    return baixas;
  }
}

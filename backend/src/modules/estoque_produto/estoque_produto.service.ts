import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstoqueProdutoEntity } from '../../entities/estoque_produto.entity';
import { EstoqueEntity } from '../../entities/estoque.entity';
import { ProdutoEntity } from '../../entities/produto.entity';

@Injectable()
export class EstoqueProdutoService {
  constructor(
    @InjectRepository(EstoqueProdutoEntity)
    private readonly estoqueProdutoRepository: Repository<EstoqueProdutoEntity>,

    @InjectRepository(EstoqueEntity)
    private readonly estoqueRepository: Repository<EstoqueEntity>,

    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  // Adicionar produto a um estoque
  async adicionarProdutoAoEstoque(
    estoqueId: number,
    produtoId: number,
    quantidade: number,
  ) {
    const estoque = await this.estoqueRepository.findOne({
      where: { id: estoqueId },
    });
    const produto = await this.produtoRepository.findOne({
      where: { id: produtoId },
    });

    if (!estoque || !produto) {
      throw new Error('Estoque ou Produto não encontrado.');
    }

    let relacao = await this.estoqueProdutoRepository.findOne({
      where: { estoque: { id: estoqueId }, produto: { id: produtoId } },
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

  // Remover um produto do estoque
  async removerProdutoDoEstoque(estoqueId: number, produtoId: number) {
    return this.estoqueProdutoRepository.delete({
      estoque: { id: estoqueId },
      produto: { id: produtoId },
    });
  }
}

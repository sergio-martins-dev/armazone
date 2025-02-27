import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdutoEntity } from '../../entities/produto.entity';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async listarTodos() {
    return this.produtoRepository.find();
  }

  async criarProduto(nome: string, preco: number, codigoBarras: string) {
    const produtoExiste = await this.produtoRepository.findOne({
      where: { codigoBarras },
    });

    if (produtoExiste) {
      throw new BadRequestException(
        'Já existe um produto com esse código de barras.',
      );
    }

    const novoProduto = this.produtoRepository.create({
      nome,
      preco,
      codigoBarras,
    });
    return this.produtoRepository.save(novoProduto);
  }

  async atualizarProduto(
    codigoBarras: string,
    dadosAtualizados: { nome?: string; preco?: number },
  ) {
    const produto = await this.produtoRepository.findOne({
      where: { codigoBarras },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    // Atualiza apenas os campos enviados
    if (dadosAtualizados.nome) produto.nome = dadosAtualizados.nome;
    if (dadosAtualizados.preco !== undefined)
      produto.preco = dadosAtualizados.preco;

    return this.produtoRepository.save(produto);
  }

  async deletarProduto(codigoBarras: string) {
    const produto = await this.produtoRepository.findOne({
      where: { codigoBarras },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return this.produtoRepository.remove(produto);
  }
}

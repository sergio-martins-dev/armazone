import { Injectable } from '@nestjs/common';
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
    const novoProduto = this.produtoRepository.create({
      nome,
      preco,
      codigoBarras,
    });
    return this.produtoRepository.save(novoProduto);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstoqueEntity } from '../../entities/estoque.entity';

@Injectable()
export class EstoquesService {
  constructor(
    @InjectRepository(EstoqueEntity)
    private readonly estoqueRepository: Repository<EstoqueEntity>,
  ) {}

  async listarTodos() {
    return this.estoqueRepository.find();
  }

  async criarEstoque(nome: string) {
    const novoEstoque = this.estoqueRepository.create({ nome });
    return this.estoqueRepository.save(novoEstoque);
  }
}

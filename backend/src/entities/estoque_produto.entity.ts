import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EstoqueEntity } from './estoque.entity';
import { ProdutoEntity } from './produto.entity';

@Entity('estoque_produto')
export class EstoqueProdutoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EstoqueEntity, (estoque) => estoque.produtos, {
    onDelete: 'CASCADE',
  })
  estoque: EstoqueEntity;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.estoques, {
    onDelete: 'CASCADE',
  })
  produto: ProdutoEntity;

  @Column('int')
  quantidade: number;
}

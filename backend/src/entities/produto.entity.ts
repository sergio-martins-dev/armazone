import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EstoqueProdutoEntity } from './estoque_produto.entity';

@Entity('produtos')
export class ProdutoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @OneToMany(() => EstoqueProdutoEntity, (ep) => ep.produto)
  estoques: EstoqueProdutoEntity[];
}

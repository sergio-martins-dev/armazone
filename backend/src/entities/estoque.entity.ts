import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EstoqueProdutoEntity } from './estoque_produto.entity';

@Entity('estoques')
export class EstoqueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nome: string;

  @OneToMany(() => EstoqueProdutoEntity, (ep) => ep.estoque)
  produtos: EstoqueProdutoEntity[];
}

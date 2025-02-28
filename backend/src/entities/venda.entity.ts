import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { EstoqueEntity } from './estoque.entity';
import { ProdutoEntity } from './produto.entity';

@Entity('vendas')
export class VendaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EstoqueEntity, { eager: true })
  estoque: EstoqueEntity;

  @ManyToOne(() => ProdutoEntity, { eager: true })
  produto: ProdutoEntity;

  @Column('int')
  quantidade: number;

  @Column()
  codigoBarras: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precoTotal: number;

  @CreateDateColumn()
  dataVenda: Date;
}

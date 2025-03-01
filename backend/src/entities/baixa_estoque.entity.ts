import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { EstoqueEntity } from './estoque.entity';
import { ProdutoEntity } from './produto.entity';

@Entity('baixas_estoque')
export class BaixaEstoqueEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => EstoqueEntity, { eager: true })
  estoque: EstoqueEntity;

  @ManyToOne(() => ProdutoEntity, { eager: true })
  produto: ProdutoEntity;

  @Column('int')
  quantidade: number;

  @Column('text')
  motivo: string;

  @CreateDateColumn()
  dataBaixa: Date;
}

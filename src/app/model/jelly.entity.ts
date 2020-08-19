import {
  Entity,
  BaseEntity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';
import { Brand } from './brand.entity';

@Entity()
export class Jelly extends BaseEntity {

  /**
   * id, name, brand_id, price, created_at, updated_at, deleted_at
   */

  @PrimaryGeneratedColumn()
  id: number;

  // 제조사 id, brand foreignkey
  @OneToMany(type => Brand, brand => brand.id)
  @Column({ name: 'brand_id', type: 'int', default: false })
  brandId: number;

  // 이름
  @Column({ name: 'name', type: 'varchar', default: false })
  name: string;

  // 가격
  @Column({ name: 'price', type: 'int', default: false})
  price: number;

  // 생성날짜
  @CreateDateColumn({ name: 'created_at', type: 'datetime'})
  createdAt: Date

  // 수정날짜
  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', nullable: true })
  updatedAt: Date

  // 삭제된 날짜
  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true})
  deletedAt: Date
}

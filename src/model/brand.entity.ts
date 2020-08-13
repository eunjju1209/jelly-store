import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
  } from "typeorm";

@Entity()
export class Brand extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  // 국가
  @Column({ name: 'nation', type: 'varchar', default: false })
  nation: string;

  // 제조사 이름
  @Column({ name: '', type: 'varchar', default: false })
  name: string;

  // 생성날짜
  @CreateDateColumn()
  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP '})
  createdAt: Date;

  // 수정날짜
  @UpdateDateColumn()
  @Column({ name: 'updated_at', type: 'timestamp', nullable: true})
  updatedAt?: Date;

  // 삭제날짜
  @DeleteDateColumn()
  @Column({ name: 'deleted_at', type: 'timestamp', nullable: true})
  deletedAt?: Date
}

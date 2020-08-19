import {
    Column,
    PrimaryGeneratedColumn,
    Entity,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
  } from "typeorm";

@Entity()
export class Brand extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  // 국가
  @Column({ name: 'nation', type: 'varchar', default: false })
  nation: string;

  // 제조사 이름
  @Column({ name: 'name', type: 'varchar', default: false })
  name: string;

  // 생성날짜
  @CreateDateColumn({ name: 'created_at', type: 'datetime'})
  createdAt: Date;

  // 수정날짜
  @UpdateDateColumn({ name: 'updated_at', type: 'datetime', nullable: true })
  updatedAt?: Date;

  // 삭제날짜
  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime', nullable: true})
  deletedAt?: Date;
}

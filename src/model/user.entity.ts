import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from "typeorm";

@Entity()
// export abstract class User {
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'varchar', default: false })
  userId: string;

  @Column({ name: 'password', type: 'varchar', default: false })
  password: string;

  // @Column( { type: 'json', default: false })
  @Column({ name: 'role', type: 'json' })
  role: any;

  // @Column({ type: 'json', default: false })
  @Column({ name: 'attribute', type: 'json', nullable: true })
  attribute: any;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // @Column({ type: 'timestamp', default: false })
  @Column({ name: 'updated_at', nullable: true })
  updatedAt: Date;
}

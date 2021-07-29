import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @PrimaryColumn('uuid')
  public companyId: string;

  @Column('uuid', { nullable: true })
  public managerId: string | null;

  @Column('text')
  public name: string;

  @Column('text')
  public email: string;

  @JoinColumn({ name: 'companyId' })
  @ManyToOne(() => Company, { onDelete: 'CASCADE' })
  public company: Company;

  @ManyToOne(() => Person, {
    onDelete: 'SET NULL',
  })
  public manager: Person;
}

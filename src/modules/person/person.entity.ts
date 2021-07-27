import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from '../company/company.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @PrimaryColumn('uuid')
  public companyId: string;

  @Column('text')
  public name: string;

  @Column('text')
  public email: string;

  @JoinColumn({ name: 'companyId' })
  @ManyToOne(() => Company, (c) => c.person, { cascade: true })
  public company: Company;
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../employee/employee.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public name: string;

  @OneToMany(() => Employee, (p) => p.company)
  public employee: Employee[];
}

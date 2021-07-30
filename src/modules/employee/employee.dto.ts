import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmployeeDTO {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public companyId: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public managerId: string;
}

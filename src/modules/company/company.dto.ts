import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyDTO {
  @IsString()
  @IsNotEmpty()
  public name: string;
}

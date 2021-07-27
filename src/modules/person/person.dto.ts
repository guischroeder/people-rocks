import { IsNotEmpty, IsString } from 'class-validator';

export class PersonDTO {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  public companyId: string;
}

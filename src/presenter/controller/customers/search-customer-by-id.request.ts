import { IsNotEmpty, Matches } from 'class-validator';

export class SearchCustomerByIdParamsDto {
  @IsNotEmpty()
  @Matches(/^[1-9]\d*$/, { message: 'Invalid ID' })
  id!: string;
}

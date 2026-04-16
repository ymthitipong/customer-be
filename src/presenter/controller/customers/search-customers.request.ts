import { IsIn, IsOptional, IsString, Matches } from 'class-validator';
import {
  customerOrderByOptions,
  type CustomerOrderByType,
} from './customer-order-map';

export class SearchCustomersQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  salesperson?: string;

  @IsOptional()
  @IsIn(customerOrderByOptions)
  order: CustomerOrderByType;

  @IsOptional()
  @Matches(/^[1-9]\d*$/, { message: 'limit must be a positive integer' })
  limit?: string;

  @IsOptional()
  @Matches(/^[1-9]\d*$/, { message: 'page must be a positive integer' })
  page?: string;
}

import { Customer } from '@/domain/interface/customer.interface';
import { CustomerRepositoryInterface } from '@domain/repository/customer.repository';
import { InternalServerErrorException } from '@nestjs/common';

export type OrderByType =
  | 'name'
  | 'totalSpend'
  | 'status'
  | 'lastActivity'
  | 'numberOfPurchases';
export type OrderDirectionType = 'asc' | 'desc';

export class SearchCustomersUsecase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async execute(
    searchOptions: { name?: string; company?: string; salesperson?: string },
    orderOptions: {
      orderBy: OrderByType;
      orderDirection: OrderDirectionType;
    },
    options: {
      limit: number;
      page: number;
    },
  ): Promise<{
    total: number;
    customers: Customer[];
  }> {
    if (
      !searchOptions.name &&
      !searchOptions.company &&
      !searchOptions.salesperson
    ) {
      console.error('Search options are required');
      throw new InternalServerErrorException('Internal server error');
    }

    const { customers, total } = await this.customerRepository.findAll({
      findOptions: searchOptions,
      orderOptions,
      options,
    });

    return { total, customers };
  }
}

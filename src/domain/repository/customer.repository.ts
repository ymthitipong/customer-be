import { Customer } from '../interface/customer.interface';

export interface FindAllOptions {
  findOptions: {
    name?: string;
    company?: string;
    salesperson?: string;
  };
  orderOptions?: {
    orderBy?:
      | 'name'
      | 'totalSpend'
      | 'status'
      | 'lastActivity'
      | 'numberOfPurchases'
      | 'id';
    orderDirection?: 'asc' | 'desc';
  };
  options?: {
    limit?: number;
    page?: number;
  };
}

export interface CustomerRepositoryInterface {
  findById(id: number): Promise<Customer | null>;
  findAll(findAllOptions: FindAllOptions): Promise<{
    total: number;
    customers: Customer[];
  }>;
}

import { Customer } from '../interface/customer.interface';

export interface CustomerRepositoryInterface {
  findById(id: number): Promise<Customer | null>;
}

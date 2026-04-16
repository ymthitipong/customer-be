import { Customer } from '@/domain/interface/customer.interface';
import { CustomerOrderByType } from '../controller/customers/customer-order-map';
import {
  CustomerResponseInterface,
  toCustomerResponse,
} from './customer.response';

export interface ListResponseInterface<T> {
  object: 'list';
  page: number;
  limit: number;
  order: CustomerOrderByType;
  total: number;
  data: T[];
}

export const toCustomerListResponse = (
  customers: Customer[],
  options: {
    page: number;
    limit: number;
    total: number;
    order: CustomerOrderByType;
  },
): ListResponseInterface<CustomerResponseInterface> => {
  return {
    object: 'list',
    page: options.page,
    limit: options.limit,
    total: options.total,
    order: options.order,
    data: customers.map(toCustomerResponse),
  };
};

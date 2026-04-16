import {
  OrderByType,
  OrderDirectionType,
} from '@/application/usecases/search-customers.usecases';
export const customerOrderByOptions = [
  'name_asc',
  'name_desc',
  'total_spend_asc',
  'total_spend_desc',
  'number_of_purchases_asc',
  'number_of_purchases_desc',
  'status_asc',
  'status_desc',
  'last_activity_asc',
  'last_activity_desc',
] as const;

export type CustomerOrderByType = (typeof customerOrderByOptions)[number];

export const toApplicationCustomerOrder = (
  orderOptions: CustomerOrderByType,
): { orderBy: OrderByType; orderDirection: OrderDirectionType } => {
  const orderMapping = {
    name_asc: { orderBy: 'name', orderDirection: 'asc' },
    name_desc: { orderBy: 'name', orderDirection: 'desc' },
    total_spend_asc: { orderBy: 'totalSpend', orderDirection: 'asc' },
    total_spend_desc: { orderBy: 'totalSpend', orderDirection: 'desc' },
    number_of_purchases_asc: {
      orderBy: 'numberOfPurchases',
      orderDirection: 'asc',
    },
    number_of_purchases_desc: {
      orderBy: 'numberOfPurchases',
      orderDirection: 'desc',
    },
    status_asc: { orderBy: 'status', orderDirection: 'asc' },
    status_desc: { orderBy: 'status', orderDirection: 'desc' },
    last_activity_asc: { orderBy: 'lastActivity', orderDirection: 'asc' },
    last_activity_desc: { orderBy: 'lastActivity', orderDirection: 'desc' },
  } as const;

  return orderMapping[orderOptions];
};

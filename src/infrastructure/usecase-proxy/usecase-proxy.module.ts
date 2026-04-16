import { SearchCustomerByIdUsecase } from '@/application/usecases/search-customer-by-id.usecase';
import { SearchCustomersUsecase } from '@/application/usecases/search-customers.usecases';
import { DynamicModule, Module } from '@nestjs/common';
import { CustomerRepository } from '../repository/customer.repository';
import { RepositoryModule } from '../repository/repository.module';

@Module({ imports: [RepositoryModule] })
export class UsecaseProxyModule {
  static SEARCH_CUSTOMER_BY_ID = 'SEARCH_CUSTOMER_BY_ID';
  static SEARCH_CUSTOMERS = 'SEARCH_CUSTOMERS';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      exports: [
        UsecaseProxyModule.SEARCH_CUSTOMER_BY_ID,
        UsecaseProxyModule.SEARCH_CUSTOMERS,
      ],
      providers: [
        {
          inject: [CustomerRepository],
          provide: UsecaseProxyModule.SEARCH_CUSTOMER_BY_ID,
          useFactory: (customerRepository: CustomerRepository) => {
            return new SearchCustomerByIdUsecase(customerRepository);
          },
        },
        {
          inject: [CustomerRepository],
          provide: UsecaseProxyModule.SEARCH_CUSTOMERS,
          useFactory: (customerRepository: CustomerRepository) => {
            return new SearchCustomersUsecase(customerRepository);
          },
        },
      ],
    };
  }
}

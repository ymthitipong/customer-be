import { SearchCustomerByIdUsecase } from '@/application/usecases/search-customer-by-id.usecase';
import { DynamicModule, Module } from '@nestjs/common';
import { CustomerRepository } from '../repository/customer.repository';
import { RepositoryModule } from '../repository/repository.module';

@Module({ imports: [RepositoryModule] })
export class UsecaseProxyModule {
  static SEARCH_CUSTOMER_BY_ID = 'SEARCH_CUSTOMER_BY_ID';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      exports: [UsecaseProxyModule.SEARCH_CUSTOMER_BY_ID],
      providers: [
        {
          inject: [CustomerRepository],
          provide: UsecaseProxyModule.SEARCH_CUSTOMER_BY_ID,
          useFactory: (customerRepository: CustomerRepository) => {
            return new SearchCustomerByIdUsecase(customerRepository);
          },
        },
      ],
    };
  }
}

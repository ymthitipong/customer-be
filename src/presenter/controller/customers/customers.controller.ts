import { SearchCustomersUsecase } from '@/application/usecases/search-customers.usecases';
import { toCustomerListResponse } from '@/presenter/response/list.response';
import { SearchCustomerByIdUsecase } from '@application/usecases/search-customer-by-id.usecase';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { toCustomerResponse } from '../../response/customer.response';
import { toApplicationCustomerOrder } from './customer-order-map';
import { SearchCustomerByIdParamsDto } from './search-customer-by-id.request';
import { SearchCustomersQueryDto } from './search-customers.request';

@Controller('api/customers')
export class CustomersController {
  constructor(
    @Inject(UsecaseProxyModule.SEARCH_CUSTOMER_BY_ID)
    private readonly searchCustomerByIdUseCase: SearchCustomerByIdUsecase,
    @Inject(UsecaseProxyModule.SEARCH_CUSTOMERS)
    private readonly searchCustomersUseCase: SearchCustomersUsecase,
  ) {}

  @Get()
  async searchCustomers(@Query() query: SearchCustomersQueryDto) {
    const {
      name,
      company,
      salesperson,
      order = 'name_asc',
      limit = 20,
      page = 1,
    } = query;

    if (!name && !company && !salesperson) {
      throw new BadRequestException('search query is required');
    }

    if (Number(limit) > 100) {
      throw new BadRequestException('limit must be less than or equal to 100');
    }

    const searchOptions = {
      name: name?.toUpperCase(),
      company: company?.toUpperCase(),
      salesperson: salesperson?.toUpperCase(),
    };
    const orderOptions = toApplicationCustomerOrder(order);
    const options = {
      limit: Number(limit),
      page: Number(page),
    };

    const { total, customers } = await this.searchCustomersUseCase.execute(
      searchOptions,
      orderOptions,
      options,
    );

    return toCustomerListResponse(customers, {
      page: options.page,
      limit: options.limit,
      total,
      order,
    });
  }

  @Get(':id')
  async searchCustomerById(@Param() params: SearchCustomerByIdParamsDto) {
    const result = await this.searchCustomerByIdUseCase.execute(
      Number(params.id),
    );

    return toCustomerResponse(result);
  }
}

import { SearchCustomerByIdUsecase } from '@application/usecases/search-customer-by-id.usecase';
import { UsecaseProxyModule } from '@infrastructure/usecase-proxy/usecase-proxy.module';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { mapCustomerToResponse } from '../../response/customer.response';
import { SearchCustomerByIdParamsDto } from './saeach-customer-by-id.request';

@Controller('api/customers')
export class CustomersController {
  constructor(
    @Inject(UsecaseProxyModule.SEARCH_CUSTOMER_BY_ID)
    private readonly searchCustomerByIdUseCase: SearchCustomerByIdUsecase,
  ) {}

  @Get()
  searchCustomers() {
    return {
      success: true,
    };
  }

  @Get(':id')
  async searchCustomerById(@Param() params: SearchCustomerByIdParamsDto) {
    const result = await this.searchCustomerByIdUseCase.execute(
      Number(params.id),
    );

    return mapCustomerToResponse(result);
  }
}

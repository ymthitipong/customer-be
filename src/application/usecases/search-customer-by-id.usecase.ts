import { CustomerRepositoryInterface } from '@/domain/repository/customer.repository';
import { NotFoundException } from '@nestjs/common';

export class SearchCustomerByIdUsecase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async execute(id: number) {
    const customer = await this.customerRepository.findById(id);

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    console.log(customer);

    return customer;
  }
}

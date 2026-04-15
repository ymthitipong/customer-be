import { Customer } from '@/domain/interface/customer.interface';
import { CustomerTypeormEntity } from '@infrastructure/config/typeorm/entities/customer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepositoryInterface } from 'src/domain/repository/customer.repository';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerRepository implements CustomerRepositoryInterface {
  constructor(
    @InjectRepository(CustomerTypeormEntity)
    private readonly customerTypeormRepository: Repository<CustomerTypeormEntity>,
  ) {}

  toCustomerDomain(customer: CustomerTypeormEntity): Customer {
    return {
      id: customer.id,
      name: customer.name,
      company: customer.company,
      initials: customer.initials,
      email: customer.email,
      phone: customer.phone,
      salesperson: customer.salesperson,
      credit_status: customer.credit_status,
      status: customer.status,
      total_spend: customer.total_spend,
      number_of_purchases: customer.number_of_purchases,
      active_since: customer.active_since,
      last_activity: customer.last_activity,
      recent_activity: customer.recent_activity,
      created_at: customer.created_at,
      updated_at: customer.updated_at,
    };
  }

  async findById(id: number) {
    const customer = await this.customerTypeormRepository.findOne({
      where: {
        id,
      },
    });

    if (!customer) {
      return null;
    }

    return this.toCustomerDomain(customer);
  }
}

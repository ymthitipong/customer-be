import { Customer } from '@/domain/interface/customer.interface';
import { CustomerTypeormEntity } from '@infrastructure/config/typeorm/entities/customer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CustomerRepositoryInterface,
  FindAllOptions,
} from 'src/domain/repository/customer.repository';
import { Like, Repository } from 'typeorm';

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
      creditStatus: customer.creditStatus,
      status: customer.status,
      totalSpend: customer.totalSpend,
      numberOfPurchases: customer.numberOfPurchases,
      activeSince: customer.activeSince,
      lastActivity: customer.lastActivity,
      recentActivity: customer.recentActivity,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
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

  async findAll(findAllOptions: FindAllOptions): Promise<{
    total: number;
    customers: Customer[];
  }> {
    const { findOptions, orderOptions, options } = findAllOptions;

    const orderBy = orderOptions?.orderBy || 'id';
    const orderDirection = orderOptions?.orderDirection ?? 'asc';
    const limit = options?.limit ?? 20;
    const page = options?.page ?? 1;

    const [customers, total] =
      await this.customerTypeormRepository.findAndCount({
        where: {
          name: findOptions.name ? Like(`%${findOptions.name}%`) : undefined,
          company: findOptions.company
            ? Like(`%${findOptions.company}%`)
            : undefined,
          salesperson: findOptions.salesperson
            ? Like(`%${findOptions.salesperson}%`)
            : undefined,
        },
        order: {
          [orderBy]: orderDirection,
        },
        take: limit,
        skip: (page - 1) * limit,
      });
    return {
      customers: customers.map((customer) => this.toCustomerDomain(customer)),
      total,
    };
  }
}

import { TypeOrmConfigModule } from '@infrastructure/config/typeorm/typeorm.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerTypeormEntity } from '../config/typeorm/entities/customer.entity';
import { CustomerRepository } from './customer.repository';

@Module({
  exports: [CustomerRepository],
  imports: [
    TypeOrmConfigModule,
    TypeOrmModule.forFeature([CustomerTypeormEntity]),
  ],
  providers: [CustomerRepository],
})
export class RepositoryModule {}

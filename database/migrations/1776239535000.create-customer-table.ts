import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCustomerTable implements MigrationInterface {
  name: string = 'createCustomerTable1776239535000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'customer',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'text',
          },
          {
            name: 'company',
            type: 'text',
          },
          {
            name: 'initials',
            type: 'text',
          },
          {
            name: 'email',
            type: 'text',
          },
          {
            name: 'phone',
            type: 'text',
          },
          {
            name: 'salesperson',
            type: 'text',
          },
          {
            name: 'credit_status',
            type: 'text',
            default: `'No Credit'`,
          },
          {
            name: 'status',
            type: 'text',
            default: `'Active'`,
          },
          {
            name: 'total_spend',
            type: 'decimal',
            precision: 12,
            scale: 2,
            default: 0,
          },
          {
            name: 'number_of_purchases',
            type: 'integer',
            default: 0,
          },
          {
            name: 'active_since',
            type: 'date',
          },
          {
            name: 'last_activity',
            type: 'timestamptz',
          },
          {
            name: 'recent_activity',
            type: 'jsonb',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customer');
  }
}

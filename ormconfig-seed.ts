import { DataSource, DataSourceOptions } from 'typeorm';

const migrationOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB || 'customer_db',
  synchronize: false,
  logging: false,
  entities: ['./src/infrastructure/typeorm/entities/*.entity{.ts,.js}'],
  migrations: ['./database/seed/*{.ts,.js}'],
  migrationsTableName: 'seed_typeorm',
};

const datasource = new DataSource(migrationOptions);

export default datasource;

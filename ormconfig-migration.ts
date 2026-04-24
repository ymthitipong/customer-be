import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const migrationOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'customer_db',
  synchronize: false,
  logging: false,
  entities: ['./src/infrastructure/typeorm/entities/*.entity{.ts,.js}'],
  migrations: ['./database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const datasource = new DataSource(migrationOptions);

export default datasource;

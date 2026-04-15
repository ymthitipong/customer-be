import { DataSource, DataSourceOptions } from 'typeorm';

const migrationOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5003'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB || 'customer_db',
  synchronize: false,
  logging: false,
  entities: ['./src/infrastructure/typeorm/entities/*.entity{.ts,.js}'],
  migrations: ['./database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations_typeorm',
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const datasource = new DataSource(migrationOptions);

export default datasource;

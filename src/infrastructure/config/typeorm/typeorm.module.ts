import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../env/env.module';
import { EnvironmentConfigService } from '../env/env.service';

export const getTypeOrmModuleOptions = (
  config: EnvironmentConfigService,
): TypeOrmModuleOptions =>
  ({
    database: config.getDatabaseConfig().name,
    entities: [__dirname + '/entities/*.entity{.ts,.js}'],
    host: config.getDatabaseConfig().host,
    password: config.getDatabaseConfig().password,
    port: config.getDatabaseConfig().port,
    schema: config.getDatabaseConfig().schema,
    synchronize: config.getDatabaseConfig().synchronize,
    type: 'postgres',
    username: config.getDatabaseConfig().username,
  }) as TypeOrmModuleOptions;

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvironmentConfigModule],
      inject: [EnvironmentConfigService],
      useFactory: getTypeOrmModuleOptions,
    }),
  ],
})
export class TypeOrmConfigModule {}

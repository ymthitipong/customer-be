import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}

  getDatabaseConfig() {
    return {
      host: this.configService.get<string>('DB_HOST') || 'localhost',
      name: this.configService.get<string>('DB_NAME') || 'customer_db',
      password: this.configService.get<string>('DB_PASSWORD') || 'postgres',
      port: this.configService.get<number>('DB_PORT') || 5432,
      schema: this.configService.get<string>('DB_SCHEMA') || 'public',
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE') || false,
      username: this.configService.get<string>('DB_USERNAME') || 'postgres',
    };
  }
}

import { UsecaseProxyModule } from '@/infrastructure/usecase-proxy/usecase-proxy.module';
import { Module } from '@nestjs/common';
import { CustomersController } from './customers/customers.controller';
import { HealthCheckController } from './health-check/health-check.controller';
import { LoginController } from './login/login.controller';

@Module({
  controllers: [HealthCheckController, LoginController, CustomersController],
  imports: [UsecaseProxyModule.register()],
})
export class ControllerModule {}

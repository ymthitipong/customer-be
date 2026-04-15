import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check/health-check.controller';
import { LoginController } from './login/login.controller';

@Module({
  controllers: [HealthCheckController, LoginController],
  imports: [],
})
export class ControllerModule {}

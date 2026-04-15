import { Module } from '@nestjs/common';
import { ControllerModule } from './presenter/controller/controller.module';

@Module({
  imports: [ControllerModule],
})
export class AppModule {}

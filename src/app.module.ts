import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ControllerModule } from './presenter/controller/controller.module';

@Module({
  imports: [
    ControllerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}

import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { LoginExceptionFilter } from 'src/infrastructure/exception/filter/401-login.filter.exception';
import { LoginByEmailDto } from './login-by-username-password.dto';

@Controller('api/login')
export class LoginController {
  constructor() {}

  @Post()
  @UseFilters(LoginExceptionFilter)
  login(@Body() _: LoginByEmailDto) {
    return {
      success: true,
    };
  }
}

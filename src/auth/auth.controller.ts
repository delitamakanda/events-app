import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('signup')
  signup(
    @Body('email') email: string,
    @Body('username') username: string,
    @Body('password', ParseIntPipe) passwordHash: string,
  ) {
    return this.authService.signup({ email, username, passwordHash });
  }
}

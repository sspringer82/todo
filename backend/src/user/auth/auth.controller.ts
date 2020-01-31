import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async createToken(
    @Body()
    user: {
      username: string;
      password: string;
    }
  ): Promise<string> {
    return await this.authService.createToken(user);
  }
}

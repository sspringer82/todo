import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiTags('Auth')
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

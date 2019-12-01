import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './token-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createToken(user: { username: string; password: string }) {
    const dbUser = await this.userRepository.findOne({
      where: { username: user.username, password: user.password },
    });
    if (dbUser) {
      const payload: JwtPayload = { username: user.username };
      return this.jwtService.sign(payload, { expiresIn: 3600 });
    } else {
      throw new BadRequestException();
    }
  }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    const dbUser = await this.userRepository.findOne({
      where: { username: payload.username },
    });
    return !!dbUser;
  }
}

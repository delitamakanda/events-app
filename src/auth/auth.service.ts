import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Credentials invalid');
    }
    const passwordMatches = await argon.verify(
      user.passwordHash,
      dto.passwordHash,
    );
    if (!passwordMatches) {
      throw new ForbiddenException('Passwords do not match');
    }
    delete user.passwordHash;
    return user;
  }

  async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.passwordHash);
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          passwordHash: hash,
        },
      });
      delete user.passwordHash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConflictException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CreateUserDto } from './dtos/create-user.dto';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signUp(dto: CreateUserDto) {
    const { email, password } = dto;

    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hash = await argon2.hash(password);

    const user = await this.usersService.create({ email, password: hash });
    return user;
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordMatching = await argon2.verify(user.password, password);

    if (!isPasswordMatching)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}

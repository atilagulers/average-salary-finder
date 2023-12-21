import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async find(email: string) {
    return await this.repo.find({ where: { email } });
  }

  async findOne(id: number) {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }

  async create(dto: CreateUserDto) {
    const { email, password } = dto;
    const user = this.repo.create({ email, password });
    return await this.repo.save(user);
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.repo.findOneBy({ id });

    if (!user) throw new NotFoundException('user not found');

    Object.assign(user, data);

    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOneBy({ id });

    if (!user) throw new NotFoundException('user not found');

    return this.repo.remove(user);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  UserRepository: any;
  constructor(private readonly userRepository: UserRepository) {}

  async save(createUserDto: CreateUserDto): Promise<void> {
    await this.UserRepository.save({
      ...createUserDto,
    });
  }

  async find(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user)
      throw new NotFoundException(`Could not find any User with id ${id}`);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.update(id, {
      ...updateUserDto,
    });
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.delete(user);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async save(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this.usersService.save(createUserDto);
  }

  @Get()
  async find(): Promise<User[]> {
    return await this.usersService.find();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.usersService.delete(id);
  }
}

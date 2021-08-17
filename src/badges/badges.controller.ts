import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from 'src/config/storage.config';

import { CreateBadgeDto, UpdateBadgeDto } from './badge.dto';
import { Badge } from './badge.entity';
import { BadgesService } from './badges.service';

@Controller('badges')
export class BadgesController {
  constructor(private readonly badgesService: BadgesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('icon', { storage }))
  async save(
    @Body() createBadgeDto: CreateBadgeDto,
    @UploadedFile() icon: Express.Multer.File,
  ): Promise<void> {
    await this.badgesService.save(createBadgeDto, icon);
  }

  @Get()
  async find(): Promise<Badge[]> {
    return await this.badgesService.find();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Badge> {
    return await this.badgesService.findById(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('icon', { storage }))
  async update(
    @Param('id') id: string,
    @Body() updateBadgeDto: UpdateBadgeDto,
    @UploadedFile() icon: Express.Multer.File,
  ): Promise<void> {
    await this.badgesService.update(id, updateBadgeDto, icon);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.badgesService.delete(id);
  }
}

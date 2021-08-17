import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';

import { CreateBadgeDto, UpdateBadgeDto } from './badge.dto';
import { Badge } from './badge.entity';
import { BadgeRepository } from './badge.repository';

@Injectable()
export class BadgesService {
  constructor(private readonly badgeRepository: BadgeRepository) {}

  async save(
    createBadgeDto: CreateBadgeDto,
    icon: Express.Multer.File,
  ): Promise<void> {
    if (!icon) throw new BadRequestException('Icon must be uploaded');
    await this.badgeRepository.save({
      ...createBadgeDto,
      icon: `/uploads/${icon.filename}`,
    });
  }

  async find(): Promise<Badge[]> {
    return await this.badgeRepository.find();
  }

  async findById(id: string): Promise<Badge> {
    const badge = await this.badgeRepository.findOne(id);
    if (!badge)
      throw new NotFoundException(`Could not find any Badge with id ${id}`);
    return badge;
  }

  async update(
    id: string,
    updateBadgeDto: UpdateBadgeDto,
    icon: Express.Multer.File,
  ): Promise<void> {
    const badge = await this.findById(id);

    if (icon) {
      fs.unlinkSync(`.${badge.icon}`);
      badge.icon = `/uploads/${icon.filename}`;
    }

    await this.badgeRepository.update(id, {
      ...updateBadgeDto,
      icon: badge.icon,
    });
  }

  async delete(id: string): Promise<void> {
    const badge = await this.findById(id);
    fs.unlinkSync(`.${badge.icon}`);
    await this.badgeRepository.delete(badge);
  }
}

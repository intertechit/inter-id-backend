import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BadgeRepository } from './badge.repository';
import { BadgesController } from './badges.controller';
import { BadgesService } from './badges.service';

@Module({
  imports: [TypeOrmModule.forFeature([BadgeRepository])],
  controllers: [BadgesController],
  providers: [BadgesService],
})
export class BadgesModule {}

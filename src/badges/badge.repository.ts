import { EntityRepository, Repository } from 'typeorm';

import { Badge } from './badge.entity';

@EntityRepository(Badge)
export class BadgeRepository extends Repository<Badge> {}

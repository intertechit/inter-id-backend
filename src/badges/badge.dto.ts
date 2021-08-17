import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { Type } from './type.enum';

export class CreateBadgeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Type)
  @IsNotEmpty()
  type: Type;
}

export class UpdateBadgeDto extends PartialType(CreateBadgeDto) {}

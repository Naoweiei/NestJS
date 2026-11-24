import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';

import { FineService } from './fine.service.js';

@Controller('fine')
export class FineController {
  constructor(private readonly fineService: FineService) {}

  @Get()
  calculate(
    @Query('days') days?: string,
    @Query('type') type?: string,
  ) {
    const num = Number(days);

    if (
      days === undefined ||
      days.trim() === '' ||
      !Number.isInteger(num) ||
      num < 0
    ) {
      throw new BadRequestException(
        'days ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป',
      );
    }

    if (!['general', 'reserve', 'reference'].includes(type ?? '')) {
      throw new BadRequestException('type ไม่ถูกต้อง');
    }

    return this.fineService.calculate(num, type!);
  }
}
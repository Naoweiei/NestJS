import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';

import { ElectricityService } from './electricity.service.js';

@Controller('electricity')
export class ElectricityController {
  constructor(
    private readonly electricityService: ElectricityService,
  ) {}

  @Get()
  calculate(
    @Query('units') units?: string,
    @Query('type') type?: string,
  ) {
    const num = Number(units);

    if (
      units === undefined ||
      units.trim() === '' ||
      !Number.isInteger(num) ||
      num < 0
    ) {
      throw new BadRequestException(
        'units ต้องเป็นจำนวนเต็มตั้งแต่ 0 ขึ้นไป',
      );
    }

    if (!['residential', 'business'].includes(type ?? '')) {
      throw new BadRequestException('type ไม่ถูกต้อง');
    }

    return this.electricityService.calculate(num, type!);
  }
}
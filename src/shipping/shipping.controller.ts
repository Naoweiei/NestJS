
import {
  Controller,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ShippingService } from './shipping.service.js';

@Controller('shipping')
export class ShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Get()
  calculate(
    @Query('weight') weight?: string,
    @Query('zone') zone?: string,
  ) {
    const num = Number(weight);

    if (
      weight === undefined ||
      weight.trim() === '' ||
      !Number.isFinite(num) ||
      num <= 0
    ) {
      throw new BadRequestException('weight ต้องเป็นตัวเลขมากกว่า 0');
    }

    if (!['bangkok', 'north', 'south'].includes(zone ?? '')) {
      throw new BadRequestException('zone ไม่ถูกต้อง');
    }

    return this.shippingService.calculate(num, zone!);
  }
}

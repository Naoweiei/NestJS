import { Injectable } from '@nestjs/common';

@Injectable()
export class ShippingService {
  calculate(weight: number, zone: string) {
    const roundedWeight = Math.ceil(weight);
    const baseFee = 50 + (roundedWeight - 1) * 18;

    let zoneFee = 0;

    if (zone === 'north') {
      zoneFee = 10;
    } else if (zone === 'south') {
      zoneFee = 25;
    }

    const total = baseFee + zoneFee;

    return {
      weight,
      zone,
      baseFee,
      zoneFee,
      total,
    };
  }
}
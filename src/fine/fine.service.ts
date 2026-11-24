import { Injectable } from '@nestjs/common';

@Injectable()
export class FineService {
  calculate(days: number, type: string) {
    const chargeableDays = Math.max(days - 3, 0);

    let rate = 0;

    if (type === 'general') {
      rate = 5;
    } else if (type === 'reserve') {
      rate = 20;
    } else if (type === 'reference') {
      rate = 50;
    }

    const total = Math.min(chargeableDays * rate, 500);

    return {
      days,
      type,
      chargeableDays,
      rate,
      total,
    };
  }
}
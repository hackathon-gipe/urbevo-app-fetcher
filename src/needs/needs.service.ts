import { Injectable, Logger } from '@nestjs/common';
import { CreateNeedDto } from './dto/create-need.dto';
import { Need } from './types/Need';
import { randomUUID } from 'crypto';

@Injectable()
export class NeedsService {
  private readonly logger = new Logger(NeedsService.name);

  async create(needData: CreateNeedDto) {
    this.logger.debug(`Creating need with data: ${JSON.stringify(needData)}`);

    const serializedNeed = new Need(
      randomUUID(),
      needData.title,
      needData.description,
      needData.category,
      needData.keywords,
      needData.coordinates,
      needData.address,
      new Date(),
      new Date(),
    ).serialize();
  }
}

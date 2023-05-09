import { Injectable, Logger } from '@nestjs/common';
import { CreateNeedDto } from './dto/create-need.dto';
import { Need, SerializedNeed } from './types/Need';
import { randomUUID } from 'crypto';
import { NeedsRepository } from './needs.repository';

@Injectable()
export class NeedsService {
  private readonly logger = new Logger(NeedsService.name);

  constructor(private readonly needRepository: NeedsRepository) {}

  async create(needData: CreateNeedDto) {
    this.logger.debug(`Creating need with data: ${JSON.stringify(needData)}`);

    const need = new Need(
      randomUUID(),
      needData.title,
      needData.description,
      needData.category,
      {
        city: needData.address.city,
        state: needData.address.state || '',
        zip: needData.address.zip || '',
        full_address: `${needData.address.street || ''} ${
          needData.address.city || ''
        } ${needData.address.state} ${needData.address.zip || ''}`,
      },
      needData.extraData,
      new Date(),
      new Date(),
      undefined,
      undefined,
      needData.coordinates || {},
    );

    return this.needRepository.storeNeed(need);
  }

  async findBySourceAndLocality(
    locality?: string,
    source?: string,
  ): Promise<SerializedNeed[]> {
    return this.needRepository.getNeedsBySourceAndLocality(locality, source);
  }

  async addLikeToNeed(id: string, like: number) {
    return this.needRepository.addLikeToNeed(id, like);
  }
}

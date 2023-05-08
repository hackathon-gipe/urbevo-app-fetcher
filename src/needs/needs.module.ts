import { Module } from '@nestjs/common';
import { NeedsController } from './needs.controller';
import { NeedsService } from './needs.service';
import { NeedsRepository } from './needs.repository';
import { DynamoDBModule } from '../clients/DynamoDB/dynamodb.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DynamoDBModule, ConfigModule],
  controllers: [NeedsController],
  providers: [NeedsService, NeedsRepository],
})
export class NeedsModule {}

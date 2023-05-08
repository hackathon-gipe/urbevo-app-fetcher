import { Module } from '@nestjs/common';
import { DynamoDBCLient } from './dynamodb.client';

@Module({
  imports: [],
  providers: [DynamoDBCLient],
  exports: [DynamoDBCLient],
})
export class DynamoDBModule {}

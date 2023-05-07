import { Module } from '@nestjs/common';
import { Kinesis } from 'aws-sdk';
import { KinesisProducerModule } from 'nest-kinesis-producer';

@Module({
  imports: [
    KinesisProducerModule.forRoot(
      new Kinesis({
        region: 'eu-south-1',
      }),
    ),
  ],
  providers: [],
})
export class KinesisModule {}

import {
  KinesisEvent,
  RetryingBatchKinesisPublisher,
} from 'nest-kinesis-producer';

export class KinesisClient {
  private readonly streamName = process.env.KINESIS_STREAM_NAME || '';

  constructor(
    private readonly kinesisPublisher: RetryingBatchKinesisPublisher,
  ) {}

  async publish(data: unknown, partitionKey: string) {
    const event: KinesisEvent = {
      Data: JSON.stringify(data),
      PartitionKey: partitionKey,
    };
    await this.kinesisPublisher.putRecords(this.streamName, [event]);
  }
}

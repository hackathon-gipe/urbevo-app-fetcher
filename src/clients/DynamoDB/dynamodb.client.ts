import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
  QueryCommand,
  QueryCommandInput,
  QueryCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  UpdateItemCommand,
  UpdateItemCommandInput,
  UpdateItemCommandOutput,
} from '@aws-sdk/client-dynamodb';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DynamoDBCLient {
  private readonly logger = new Logger(DynamoDBCLient.name);
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({});
  }

  public async putItem(input: PutItemCommandInput) {
    this.logger.debug(`Putting item: ${JSON.stringify(input)}`);

    const putItemCommand = new PutItemCommand(input);

    return this.client.send(putItemCommand);
  }

  public queryItems(input: QueryCommandInput): Promise<QueryCommandOutput> {
    this.logger.debug(`Querying items: ${JSON.stringify(input)}`);

    const command = new QueryCommand(input);

    return this.client.send(command);
  }

  public scanItems(input: ScanCommandInput): Promise<ScanCommandOutput> {
    this.logger.debug(`Scanning items: ${JSON.stringify(input)}`);

    const command = new ScanCommand(input);

    return this.client.send(command);
  }

  public async updateItem(
    input: UpdateItemCommandInput,
  ): Promise<UpdateItemCommandOutput> {
    this.logger.debug(`Updating item: ${JSON.stringify(input)}`);

    const command = new UpdateItemCommand(input);

    return this.client.send(command);
  }
}

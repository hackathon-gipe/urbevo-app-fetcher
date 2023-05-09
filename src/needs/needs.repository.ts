import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DynamoDBCLient } from '../clients/DynamoDB/dynamodb.client';
import { Need, SerializedNeed } from './types/Need';
import { ConfigService } from '@nestjs/config';
import {
  AttributeValue,
  PutItemCommandInput,
  QueryCommandInput,
  UpdateItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';

@Injectable()
export class NeedsRepository {
  private readonly logger = new Logger(NeedsRepository.name);

  constructor(
    private readonly dynamoDBClient: DynamoDBCLient,
    private readonly config: ConfigService,
  ) {}

  async storeNeed(need: Need): Promise<void> {
    this.logger.log(`Storing need: ${JSON.stringify(need.serialize())}`);

    const rawNeed = {
      need_id: need.id,
      locality_name: need.address.city,
      raw_text: JSON.stringify(need.serialize()),
      relevance_data: {
        likes: 1,
      },
      source: need.source,
      source_link: '',
      extraction_date: need.extractionDate.toISOString(),
    };

    const cleanNeed = {
      need_id: need.id,
      source: need.source,
      title: need.title,
      description: need.description,
      category: need.category,
      locality_name: need.address.city,
      province: need.address.state,
      zip_code: need.address.zip,
      full_address: need.address.full_address,
      relevance_score: 0,
      source_link: '',
      extraction_date: need.extractionDate.toISOString(),
      extra_details: need.extraData,
    };

    const putCleanNeedCommandInput: PutItemCommandInput = {
      TableName: this.config.get<string>('CLEAN_NEEDS_TABLE', ''),
      Item: marshall(cleanNeed),
    };
    await this.dynamoDBClient.putItem(putCleanNeedCommandInput);

    const putRawNeedCommandInput: PutItemCommandInput = {
      TableName: this.config.get<string>('RAW_NEEDS_TABLE', ''),
      Item: marshall(rawNeed),
    };
    await this.dynamoDBClient.putItem(putRawNeedCommandInput);
  }

  async getNeedsBySourceAndLocality(
    locality: string,
    source?: string,
  ): Promise<SerializedNeed[]> {
    const getItemCommandInput: QueryCommandInput = {
      TableName: this.config.get<string>('CLEAN_NEEDS_TABLE', ''),
      IndexName: 'locality_name-index',
      KeyConditionExpression: 'locality_name = :locality',
      ExpressionAttributeValues: {
        ':locality': { S: locality },
      },
    };

    if (source) {
      getItemCommandInput.FilterExpression = '#source = :source';
      getItemCommandInput.ExpressionAttributeNames = {
        '#source': 'source',
      };
      (
        getItemCommandInput.ExpressionAttributeValues as Record<
          string,
          AttributeValue
        >
      )[':source'] = {
        S: source,
      };
    }

    const needs = await this.dynamoDBClient.queryItems(getItemCommandInput);

    const serializedNeeds = needs.Items?.map((need) =>
      this.buildNeed(need).serialize(),
    );

    return serializedNeeds || [];
  }

  async addLikeToNeed(id: string, like: number): Promise<void> {
    const getItemCommandInput: QueryCommandInput = {
      TableName: this.config.get<string>('RAW_NEEDS_TABLE', ''),
      KeyConditionExpression: 'need_id = :id',
      ExpressionAttributeValues: {
        ':id': { S: id },
      },
    };
    const needs = await this.dynamoDBClient.queryItems(getItemCommandInput);

    if (needs.Count === 0) {
      throw new NotFoundException(`Need with id ${id} not found`);
    }

    const need = needs.Items?.[0];

    const updateItemCommand: UpdateItemCommandInput = {
      TableName: this.config.get<string>('RAW_NEEDS_TABLE', ''),
      Key: {
        need_id: { S: id },
      },
      UpdateExpression: 'ADD relevance_data.likes :like',
      ExpressionAttributeValues: {
        ':like': { N: like.toString() },
      },
    };

    await this.dynamoDBClient.updateItem(updateItemCommand);

    const likesAmount = Number(need?.relevance_data.M?.likes?.N || '0') + like;

    const relevanceScore = this.getRelevanceScoreByLikes(likesAmount);

    const updateCleanItemCommand: UpdateItemCommandInput = {
      TableName: this.config.get<string>('CLEAN_NEEDS_TABLE', ''),
      Key: {
        need_id: { S: id },
        extraction_date: { S: need?.extraction_date.S || '' },
      },
      UpdateExpression: 'SET relevance_score = :score',
      ExpressionAttributeValues: {
        ':score': { N: relevanceScore.toString() },
      },
    };

    await this.dynamoDBClient.updateItem(updateCleanItemCommand);
  }

  private buildNeed(need: Record<string, AttributeValue>): Need {
    return new Need(
      need.need_id.S || '',
      need.title.S || '',
      need.description.S || '',
      need.category.S || '',
      {
        city: need.locality_name.S || '',
        state: need.province.S || '',
        zip: need.zip_code.S || '',
        full_address: need.full_address.S || '',
      },
      need.extra_details.S || '',
      new Date(need.extraction_date.S || ''),
      new Date(need.updated_at?.S || ''),
      Number(need.relevance_score.N || ''),
      need.source_link.S || '',
    );
  }

  private getRelevanceScoreByLikes(likes: number): number {
    let relevanceScore = 1;

    // If more than 10 likes, relevance score is 2
    // if more than 20 likes, relevance score is 3
    if (likes > 10) {
      relevanceScore = 2;
    } else if (likes > 20) {
      relevanceScore = 3;
    }

    return relevanceScore;
  }
}

import {
  BatchGetCommandInput,
  BatchGetCommandOutput,
  BatchWriteCommandInput,
  BatchWriteCommandOutput,
  DeleteCommandInput,
  DeleteCommandOutput,
  DynamoDBDocument,
  GetCommandInput,
  GetCommandOutput,
  PutCommandInput,
  PutCommandOutput,
  QueryCommandInput,
  QueryCommandOutput,
  ScanCommandInput,
  ScanCommandOutput,
  TransactGetCommandInput,
  TransactGetCommandOutput,
  TransactWriteCommandInput,
  TransactWriteCommandOutput,
  UpdateCommandInput,
  UpdateCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { construct, getDynamoDBDocClient } from './dynamoDBDocClient';
import { marshallOptions, unmarshallOptions } from '@aws-sdk/util-dynamodb';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

import { toDeleteCommandInput, toGetCommandInput, toModel, toPutCommandInput } from '../converters';
import { IModel } from '../interfaces';

export interface DynamoDBDocumentClientConfig {
  clientConfig: DynamoDBClientConfig | undefined;
  marshallOptions: marshallOptions | undefined;
  unmarshallOptions: unmarshallOptions | undefined;
}

export class DynamoDBDocumentClient {
  private readonly client: DynamoDBDocument;

  constructor(config: DynamoDBDocumentClientConfig | undefined) {
    const { clientConfig, marshallOptions, unmarshallOptions } = config;
    construct(clientConfig, marshallOptions, unmarshallOptions);
    this.client = getDynamoDBDocClient();
  }

  public async get<T extends object>(
    params: Partial<GetCommandInput>,
    model?: IModel<T> | T
  ): Promise<GetCommandOutput> {
    if (!model) {
      return await this.client.get(params as GetCommandInput);
    }
    const input = toGetCommandInput<T>(params, model);
    const output = await this.client.get(input);
    if (!output.Item) {
      return output;
    }
    output.Item = toModel<IModel<T> | T>(output.Item, model);
    return output;
  }

  public async delete<T extends object>(
    params: Partial<DeleteCommandInput>,
    model?: IModel<T>
  ): Promise<DeleteCommandOutput> {
    if (!model) {
      return await this.client.delete(params as DeleteCommandInput);
    }
    const input = toDeleteCommandInput<T>(params, model);
    return await this.client.delete(input);
  }

  public async put<T extends object>(params: Partial<PutCommandInput>): Promise<PutCommandOutput> {
    const model = params.Item;
    const ddb = (model as IModel<T>).ddb || model['_ddb'](model);
    if (!ddb) {
      return await this.client.put(params as PutCommandInput);
    }
    const input = toPutCommandInput<T>(params, model as IModel<T> | T);
    return await this.client.put(input);
  }

  public async update(params: UpdateCommandInput): Promise<UpdateCommandOutput> {
    return await this.client.update(params);
  }

  public async query(params: QueryCommandInput): Promise<QueryCommandOutput> {
    return await this.client.query(params);
  }

  public async scan(params: ScanCommandInput): Promise<ScanCommandOutput> {
    return await this.client.scan(params);
  }

  public async transactGet(params: TransactGetCommandInput): Promise<TransactGetCommandOutput> {
    return await this.client.transactGet(params);
  }

  public async transactWrite(params: TransactWriteCommandInput): Promise<TransactWriteCommandOutput> {
    return await this.client.transactWrite(params);
  }

  public async batchGet(params: BatchGetCommandInput): Promise<BatchGetCommandOutput> {
    return await this.client.batchGet(params);
  }

  public async batchWrite(params: BatchWriteCommandInput): Promise<BatchWriteCommandOutput> {
    return await this.client.batchWrite(params);
  }
}

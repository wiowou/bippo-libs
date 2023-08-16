import { marshallOptions, unmarshallOptions } from '@aws-sdk/util-dynamodb';
import { DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';

import { getDynamoDBClient } from './dynamoDBClient';

let docClient: DynamoDBDocument;

export function construct(
  clientConfig: DynamoDBClientConfig | undefined,
  marshallOptions: marshallOptions | undefined,
  unmarshallOptions: unmarshallOptions | undefined
): void {
  clientConfig = clientConfig || {};
  marshallOptions = marshallOptions || {
    convertEmptyValues: false,
    removeUndefinedValues: false,
    convertClassInstanceToMap: false,
  };
  unmarshallOptions = unmarshallOptions || {
    wrapNumbers: false,
  };
  // Bare-bones DynamoDB Client
  const dynamoClient = getDynamoDBClient(clientConfig);

  // Full document client
  if (docClient) {
    docClient.destroy();
  }
  docClient = DynamoDBDocument.from(dynamoClient, {
    marshallOptions,
    unmarshallOptions,
  });
}

export function getDynamoDBDocClient(): DynamoDBDocument {
  return docClient;
}

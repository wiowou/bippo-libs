import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

let dynamoClient: DynamoDBClient;

function construct(clientConfig: DynamoDBClientConfig | undefined): void {
  clientConfig = clientConfig || {};
  // Bare-bones DynamoDB Client
  dynamoClient = new DynamoDBClient(clientConfig);
}

export function getDynamoDBClient(clientConfig: DynamoDBClientConfig | undefined): DynamoDBClient {
  if (!dynamoClient) {
    construct(clientConfig);
  }
  return dynamoClient;
}

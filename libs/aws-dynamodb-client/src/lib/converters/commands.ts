import { DeleteCommandInput, GetCommandInput, PutCommandInput } from '@aws-sdk/lib-dynamodb';
import { toItem } from './model';

import { IModel } from '../interfaces';

export function toGetCommandInput<T>(params: Partial<GetCommandInput>, model: IModel<T> | T): GetCommandInput {
  const ddb = (model as IModel<T>).ddb || model['_ddb'](model);
  const input = {
    ...params,
  } as GetCommandInput;
  input.TableName = input.TableName || ddb.tableName;
  input.ExpressionAttributeNames = {
    ...ddb.expressionAttributeNames,
    ...(input.ExpressionAttributeNames || {}),
  };
  return input;
}

export function toDeleteCommandInput<T>(params: Partial<DeleteCommandInput>, model: IModel<T> | T): DeleteCommandInput {
  const ddb = (model as IModel<T>).ddb || model['_ddb'](model);
  const input = {
    ...params,
  } as DeleteCommandInput;
  input.TableName = input.TableName || ddb.tableName;
  input.ExpressionAttributeNames = {
    ...ddb.expressionAttributeNames,
    ...(input.ExpressionAttributeNames || {}),
  };
  input.ExpressionAttributeValues = {
    ...ddb.expressionAttributeValues,
    ...(input.ExpressionAttributeValues || {}),
  };
  return input;
}

export function toPutCommandInput<T>(params: Partial<PutCommandInput>, model: IModel<T> | T): PutCommandInput {
  const ddb = (model as IModel<T>).ddb || model['_ddb'](model);
  const input = {
    ...params,
  } as PutCommandInput;
  input.TableName = input.TableName || ddb.tableName;
  input.ExpressionAttributeNames = {
    ...ddb.expressionAttributeNames,
    ...(input.ExpressionAttributeNames || {}),
  };
  input.ExpressionAttributeValues = {
    ...ddb.expressionAttributeValues,
    ...(input.ExpressionAttributeValues || {}),
  };
  const item = toItem(model);
  input.Item = { ...item, ...(input.Item || {}) };
  return input;
}

import { IModel } from '../interfaces';
import { TableNotFoundError } from '../errors';
import { toItem } from '../converters';
import { UpdateCommandInput } from '@aws-sdk/lib-dynamodb';

export enum EAction {
  SET = 'SET',
  REMOVE = 'REMOVE',
  ADD = 'ADD',
  DELETE = 'DELETE',
}

export function add(
  attributeName: string,
  value: Set<unknown> | number
): Pick<UpdateCommandInput, 'UpdateExpression' | 'ExpressionAttributeNames' | 'ExpressionAttributeValues'> {
  return updateItemSet(EAction.ADD, attributeName, value);
}

export function del(
  attributeName: string,
  value: Set<unknown> | number
): Pick<UpdateCommandInput, 'UpdateExpression' | 'ExpressionAttributeNames' | 'ExpressionAttributeValues'> {
  return updateItemSet(EAction.DELETE, attributeName, value);
}

function updateItemSet(
  action: EAction,
  attributeName: string,
  value: Set<unknown> | number
): Pick<UpdateCommandInput, 'UpdateExpression' | 'ExpressionAttributeNames' | 'ExpressionAttributeValues'> {
  const UpdateExpression = `${action} #${attributeName} :${attributeName}`;
  const ExpressionAttributeNames = {
    [`#${attributeName}`]: attributeName,
  };
  const ExpressionAttributeValues = {
    [`:${attributeName}`]: value,
  };
  return {
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  };
}

export function set<T extends object>(
  model: Partial<IModel<T> | T>
): Pick<UpdateCommandInput, 'UpdateExpression' | 'ExpressionAttributeNames' | 'ExpressionAttributeValues'> {
  if (!Object.keys(model).length) {
    return {};
  }
  let item: object;
  try {
    item = toItem(model);
  } catch (err) {
    if (err.name === TableNotFoundError.errorType) {
      item = model as T;
    } else {
      throw err;
    }
  }
  const keys = Object.keys(item);
  const UpdateExpression = EAction.SET + ' ' + keys.map((k) => `#${k} = :${k}`).join(', ');
  const ExpressionAttributeNames = Object.fromEntries(keys.map((k) => [`#${k}`, k]));
  const ExpressionAttributeValues = Object.fromEntries(keys.map((k) => [`:${k}`, item[k]]));
  return {
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  };
}

export function remove<T extends object>(
  model: Partial<IModel<T> | T>
): Pick<UpdateCommandInput, 'UpdateExpression' | 'ExpressionAttributeNames' | 'ExpressionAttributeValues'> {
  if (!Object.keys(model).length) {
    return {};
  }
  let item: object;
  try {
    item = toItem(model);
  } catch (err) {
    if (err.name === TableNotFoundError.errorType) {
      item = model as T;
    } else {
      throw err;
    }
  }
  const keys = Object.keys(item);
  const UpdateExpression = EAction.SET + ' ' + keys.map((k) => `#${k}`).join(', ');
  const ExpressionAttributeNames = Object.fromEntries(keys.map((k) => [`#${k}`, k]));
  const ExpressionAttributeValues = {};
  return {
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  };
}

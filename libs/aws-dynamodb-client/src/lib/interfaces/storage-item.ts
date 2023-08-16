import { IAttribute } from './attribute';
import { IIndex } from './idx';

export const enum EStorageItemSubType {
  PARTITION_KEY = 'partitionKey',
  SORT_KEY = 'sortKey',
  INDEX_PARTITION_KEY = 'indexPartitionKey',
  INDEX_SORT_KEY = 'indexSortKey',
  ATTRIBUTE = 'attributes',
}

export interface IStorageItem<T> {
  tableName: string;
  partitionKey: IAttribute;
  sortKey: IAttribute;
  index: {
    [k: string]: IIndex;
  };
  attributes: {
    [key in keyof T]?: IAttribute;
  };
  target: T;
  attributeNames: string[];
  expressionAttributeNames: Record<string, string>;
  expressionAttributeValues: Record<string, string>;
  xname: { [key in keyof T]: string };
  xval: { [key in keyof T]: string };
  clone: () => IStorageItem<T>;
}

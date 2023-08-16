import { IAttribute } from '../interfaces/attribute';
import { IIndex } from '../interfaces/idx';
import { IStorageItem } from '../interfaces';

import { toExpressionAttributeNames, toExpressionAttributeValues, toList, toPropertyByAttribute } from '../converters';

export class StorageItem<T extends object> implements IStorageItem<T> {
  tableName: string;
  partitionKey: IAttribute;
  sortKey: IAttribute;
  index: { [k: string]: IIndex } = {};
  attributes: { [key in keyof T]?: IAttribute } = {};
  #target: T;

  public set target(t: T) {
    this.#target = t;
  }
  public clone(): IStorageItem<T> {
    const storageItem = new StorageItem<T>();
    storageItem.tableName = this.tableName;
    storageItem.partitionKey = { ...this.partitionKey };
    storageItem.sortKey = { ...this.sortKey };
    for (const k in this.index) {
      storageItem.index[k] = {
        partitionKey: { ...this.index[k].partitionKey },
        sortKey: this.index[k].sortKey && { ...this.index[k].sortKey },
      };
    }
    for (const k in this.attributes) {
      storageItem.attributes[k] = { ...this.attributes[k] };
    }
    return storageItem;
  }

  public get attributeNames(): string[] {
    return toList(this.attributes, '#');
  }

  public get expressionAttributeNames(): Record<string, string> {
    return toExpressionAttributeNames<T>(this.attributes, '#');
  }

  public get expressionAttributeValues(): Record<string, string> {
    return toExpressionAttributeValues(this.attributes, this.#target, ':');
  }

  public get xname(): { [key in keyof T]: string } {
    return toPropertyByAttribute(this.attributes, '#');
  }

  public get xval(): { [key in keyof T]: string } {
    return toPropertyByAttribute(this.attributes, ':');
  }
}

import { IStorageItem } from '../interfaces';
import { metadataStore } from '../store/store';
import { StorageItem } from '../store/storage-item';

export function Table(name: string) {
  return function <T extends { new (...args: any[]): any }>(constructor: T) {
    if (!(constructor.name in metadataStore)) {
      metadataStore[constructor.name] = new StorageItem<T>();
    }
    const storageItem: IStorageItem<T> = metadataStore[constructor.name];
    const parentStorageItem: IStorageItem<T> = constructor.prototype.ddb ? constructor.prototype.ddb : undefined;

    storageItem.partitionKey = storageItem?.partitionKey || parentStorageItem?.partitionKey;
    storageItem.sortKey = storageItem?.sortKey || parentStorageItem?.sortKey;
    storageItem.index = {
      ...parentStorageItem?.index,
      ...storageItem?.index,
    };
    storageItem.attributes = {
      ...parentStorageItem?.attributes,
      ...storageItem?.attributes,
    };
    storageItem.tableName = name;

    class Model extends constructor {
      static get ddb(): IStorageItem<T> {
        return storageItem.clone();
      }
      _ddb(that: T): IStorageItem<T> {
        const item = storageItem.clone();
        item.target = that;
        return item;
      }
    }
    return Model as typeof constructor;
  };
}

import { IStorageItem } from './storage-item';

export interface IModel<T> {
  ddb: IStorageItem<T>;
}

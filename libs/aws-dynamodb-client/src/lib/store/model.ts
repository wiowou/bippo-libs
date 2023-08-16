import { IModel, IStorageItem } from '../interfaces';
import { StorageItem } from './storage-item';

export abstract class Model<T extends object> implements IModel<T> {
  static ddb<T extends object>(): IStorageItem<T> {
    return new StorageItem<T>();
  }
  _ddb(self: Model<T>): IStorageItem<T> {
    return new StorageItem<T>();
  }
  public get ddb(): IStorageItem<T> {
    return this._ddb(this);
  }
}

import { IAttribute } from './attribute';

export interface IIndex {
  partitionKey?: IAttribute;
  sortKey?: IAttribute;
}

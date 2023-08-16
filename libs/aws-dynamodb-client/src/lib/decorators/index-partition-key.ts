import { _Attribute } from './_attribute';
import { EStorageItemSubType } from '../interfaces';

export const IndexPartitionKey = function (indexName: string, attributeName?: string) {
  return _Attribute(EStorageItemSubType.INDEX_PARTITION_KEY)(indexName)(attributeName);
};

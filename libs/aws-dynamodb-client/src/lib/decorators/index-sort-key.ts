import { _Attribute } from './_attribute';
import { EStorageItemSubType } from '../interfaces';

export const IndexSortKey = function (indexName: string, attributeName?: string) {
  return _Attribute(EStorageItemSubType.INDEX_SORT_KEY)(indexName)(attributeName);
};

import { EStorageItemSubType } from '../interfaces';
import { IAttribute } from '../interfaces/attribute';
import { metadataStore } from '../store/store';
import { StorageItem } from '../store/storage-item';

export function _Attribute(storageItemSubType: EStorageItemSubType) {
  return function (indexName?: string) {
    return function (attributeName?: string) {
      return function (target: unknown, propertyKey: string, descriptor?: PropertyDescriptor) {
        const className = target.constructor.name;
        if (!(className in metadataStore)) {
          metadataStore[className] = new StorageItem();
        }
        const storageItem = metadataStore[className];
        const attribute: IAttribute = {
          propertyName: propertyKey,
          name: attributeName || propertyKey,
          method: descriptor?.value || descriptor?.get || descriptor?.set,
          isAccessor: !!descriptor?.get || !!descriptor?.set,
        };
        storageItem[EStorageItemSubType.ATTRIBUTE][propertyKey] = attribute;
        switch (storageItemSubType) {
          case EStorageItemSubType.PARTITION_KEY:
          case EStorageItemSubType.SORT_KEY:
            storageItem[storageItemSubType] = attribute;
            break;
          case EStorageItemSubType.INDEX_PARTITION_KEY:
            if (!(indexName in storageItem.index)) {
              storageItem.index[indexName] = {};
            }
            storageItem.index[indexName].partitionKey = attribute;
            break;
          case EStorageItemSubType.INDEX_SORT_KEY:
            if (!(indexName in storageItem.index)) {
              storageItem.index[indexName] = {};
            }
            storageItem.index[indexName].sortKey = attribute;
            break;
        }
      };
    };
  };
}

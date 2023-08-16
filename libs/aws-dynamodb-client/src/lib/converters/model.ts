import { ClassConstructor, plainToInstance } from 'class-transformer';

import { IAttribute } from '../interfaces/attribute';
import { IModel } from '../interfaces';
import { TableNotFoundError } from '../errors';
import { toAttributeByProperty } from './attributes';

export function toModel<T extends object>(item: object, model: T | ClassConstructor<T>): T {
  const ddb = model['ddb'] || model['_ddb']();
  const attributes: { [key in keyof T]?: IAttribute } = ddb.attributes;
  const toAByP = toAttributeByProperty<T>(attributes);
  const plain = Object.fromEntries(
    Object.entries(item)
      .filter(([k]) => !attributes[toAByP[k]]?.method && attributes[toAByP[k]])
      .map(([k, v]) => [toAByP[k], v])
  );
  const instance = plainToInstance(
    typeof model === 'function' ? model : (model.constructor as ClassConstructor<T>),
    plain
  );
  Object.values<IAttribute>(attributes)
    .filter((a) => a.method && !a.isAccessor)
    .forEach((a) => (instance[a.propertyName] = () => item[a.name]));
  return instance;
}

export function toItem<T extends object>(model: Partial<IModel<T> | T>): Record<string, unknown> {
  const ddb = model['ddb'] || model['_ddb']();
  if (!ddb) {
    throw new TableNotFoundError();
  }
  const attributes = ddb.attributes;
  return Object.fromEntries(
    Object.values<IAttribute>(attributes)
      .map((a) => [a.name, a.method && !a.isAccessor ? model[a.propertyName]() : model[a.propertyName]])
      .filter(([, value]) => typeof value !== 'undefined')
  );
}

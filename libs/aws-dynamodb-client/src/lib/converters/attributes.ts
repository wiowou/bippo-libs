import { IAttribute } from '../interfaces/attribute';

export function toList<T>(attributes: { [key in keyof T]?: IAttribute }, prefix: string): string[] {
  return Object.keys(toExpressionAttributeNames(attributes, prefix));
}

export function toPropertyByAttribute<T>(
  attributes: { [key in keyof T]?: IAttribute },
  prefix = ''
): { [key in keyof T]: string } {
  const entries = Object.values<IAttribute>(attributes).map((a) => [a.propertyName, prefix + a.name]);
  return Object.fromEntries(entries);
}

export function toAttributeByProperty<T>(attributes: { [key in keyof T]?: IAttribute }): Record<string, string> {
  const entries = Object.values<IAttribute>(attributes).map((a) => [a.name, a.propertyName]);
  return Object.fromEntries(entries);
}

export function toAttributeByMethod<T>(attributes: { [key in keyof T]?: IAttribute }): Record<string, keyof T> {
  const entries = Object.values<IAttribute>(attributes)
    .filter((a) => a.method)
    .map((a) => [a.name, a.propertyName]);
  return Object.fromEntries(entries);
}

export function toExpressionAttributeNames<T>(attributes: { [key in keyof T]?: IAttribute }, prefix: string) {
  return Object.fromEntries(Object.values<IAttribute>(attributes).map((a) => [prefix + a.propertyName, a.name]));
}

export function toExpressionAttributeValues<T>(
  attributes: { [key in keyof T]?: IAttribute },
  item: object,
  prefix: string
) {
  return Object.fromEntries(
    Object.values<IAttribute>(attributes).map((a) => {
      return [prefix + a.propertyName, a.method ? a.method.bind(item)() : item[a.propertyName]];
    })
  );
}

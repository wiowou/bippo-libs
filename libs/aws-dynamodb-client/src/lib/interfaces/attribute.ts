export interface IAttribute {
  name: string; //name stored in ddb
  propertyName: string; //class property/method name
  method: () => unknown;
  isAccessor: boolean;
}

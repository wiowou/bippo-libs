import { Attribute, PartitionKey, Table } from '../../src/lib/decorators';
import { Model2 } from './Model2';

@Table('foobarDerived')
export class Model2Derived extends Model2 {
  constructor() {
    super();
    this.prop2 = 45;
  }

  @PartitionKey()
  public prop2: number;

  @Attribute()
  public dee: string;
}

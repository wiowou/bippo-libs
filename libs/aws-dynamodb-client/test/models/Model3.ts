import { Attribute, IndexPartitionKey, PartitionKey, Table } from '../../src/lib/decorators';
import { Model } from '../../src/lib/store';

@Table('foobar')
export class Model3 extends Model<Model3> {
  constructor() {
    super();
  }

  @PartitionKey()
  public get num(): number {
    return 4;
  }

  @IndexPartitionKey('GSI1')
  public get kay(): string {
    return 'k';
  }

  @Attribute('vee')
  public get vee(): string {
    return 'v';
  }
}

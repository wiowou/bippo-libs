import { Attribute, IndexPartitionKey, IndexSortKey, PartitionKey, Table } from '../../src/lib/decorators';
import { Model } from '../../src/lib/store';

@Table('foobar')
export class Model2 extends Model<Model2> {
  constructor() {
    super();
    this.num = 54;
  }

  public isPartial = false;

  @PartitionKey()
  public num: number;

  @IndexPartitionKey('GSI1')
  public kay: string;

  @IndexSortKey('GSI1')
  public say: string;

  @Attribute('wee')
  public vee: string;

  @Attribute()
  public blah() {
    return this.isPartial ? undefined : 34;
  }
}

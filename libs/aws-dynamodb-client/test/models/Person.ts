import { Attribute, IndexPartitionKey, IndexSortKey, PartitionKey, SortKey, Table } from '../../src/lib/decorators';
import { Model } from '../../src/lib/store';

@Table('MyTable')
export class PersonDTO extends Model<PersonDTO> {
  @Attribute('dee')
  public dee: string;

  @Attribute('tee')
  public tee: string;

  @Attribute('wee')
  public vee: string;

  @Attribute()
  public firstName: string;

  @Attribute()
  public lastName: string;
}

@Table('MyTable')
export class PersonModel extends PersonDTO {
  @PartitionKey()
  public PK() {
    return 'CLUB';
  }

  @SortKey()
  public SK() {
    return `PERSON#${this.firstName}#${this.lastName}`;
  }

  @IndexPartitionKey('GSI1')
  public kay: string;

  @IndexSortKey('GSI1')
  public say: string;

  @Attribute()
  public createdAt() {
    return new Date().toISOString();
  }

  @Attribute('updatedAt')
  public get updatedAt() {
    return new Date().toISOString();
  }
}

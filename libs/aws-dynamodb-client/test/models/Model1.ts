import { Attribute, PartitionKey, Table } from '../../src/lib/decorators';
import { IsNumber, Min } from 'class-validator';

@Table('foobar')
export class Model1 {
  @Min(54)
  @IsNumber()
  @PartitionKey()
  public num: number;

  constructor() {
    this.num = 54;
  }

  @Attribute()
  public blah(): number {
    return this.num ? this.num + 1 : undefined;
  }
}

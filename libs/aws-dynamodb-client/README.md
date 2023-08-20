# aws-dynamodb-client

![Build Status](https://github.com/wiowou/bippo-util/workflows/CI/badge.svg)

Use decorators on model classes to simplify the inputs to the DynamoDB client and receive model classes as an output.
Internally uses [@aws-sdk/lib-dynamodb v3](https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb) and [class-validator](https://github.com/typestack/class-validator/tree/develop)

## Installation

```sh
npm install @bippo-libs/aws-dynamodb-client
```

## Usage

Create a model class and use decorators for attributes and keys. Here, a DTO (Data Transfer Object) class is also defined so that keys and meta data like `createdOn` remain in the data access layer. Note that attributes can have aliases, and that some attributes are properties, others defined using methods, and still others with accessors. Attributes defined using properties and methods are overwritten with the values pulled from dynamodb whereas accessors (in this case getters) are not. This means after an item/model has been retrieved from dynamodb, `updatedOn` will always assume the datetime value of when it is written to dynamodb whereas `createdOn` will retain the value from dynamodb by default.

```typescript
import {
  Attribute,
  IndexPartitionKey,
  IndexSortKey,
  Model,
  PartitionKey,
  SortKey,
  Table,
} from '@bippo-libs/aws-dynamodb-client';

@Table('MyTable')
export class PersonDTO extends Model<PersonDTO> {
  @Attribute()
  public phone: string;

  @Attribute()
  public email: string;

  @Attribute('dob')
  public dateOfBirth: Date;

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
  public get GSI1PK(): string {
    return `LASTNAME#${this.lastname}`;
  }

  @IndexSortKey('GSI1')
  public get GSI1SK(): string {
    return this.email;
  }

  @Attribute()
  public createdOn() {
    return new Date().toISOString();
  }

  @Attribute()
  public get updatedOn() {
    return new Date().toISOString();
  }
}
```

import { DeleteCommandInput, GetCommandInput, PutCommandInput } from '@aws-sdk/lib-dynamodb';

import { Model1, Model2 } from '../models';
import { toDeleteCommandInput, toGetCommandInput, toPutCommandInput } from '../../src/lib/converters';

describe('command converters', () => {
  let m1: Model1;
  let m2: Model2;
  beforeAll(() => {
    m1 = new Model1();
    m2 = new Model2();
    m2.kay = 'abc';
    m2.say = 'efg';
    m2.vee = 'hij';
  });
  describe('to get command input', () => {
    let input2: Partial<GetCommandInput>;
    let input1: Partial<GetCommandInput>;
    beforeAll(() => {
      input2 = {
        Key: {
          num: 54,
        },
      };
      input1 = {
        Key: {
          num: 54,
        },
      };
    });
    describe('for classes extended with Model', () => {
      it('should populate unspecified properties', () => {
        const expected: GetCommandInput = {
          Key: input2.Key,
          TableName: 'foobar',
          ExpressionAttributeNames: m2.ddb.expressionAttributeNames,
        };
        expect(toGetCommandInput(input2, m2)).toEqual(expected);
      });
      it('should merge and override expression attribute names', () => {
        const params = {
          ...input2,
          ExpressionAttributeNames: {
            ['#coo']: 'coo',
            ['#kay']: 'kay2',
          },
        };
        const expected: GetCommandInput = {
          Key: input2.Key,
          TableName: 'foobar',
          ExpressionAttributeNames: { ...m2.ddb.expressionAttributeNames, ...params.ExpressionAttributeNames },
        };
        expect(toGetCommandInput(params, m2)).toEqual(expected);
      });
    });
    describe('for classes not extended with Model', () => {
      it('should populate unspecified properties', () => {
        const expected: GetCommandInput = {
          Key: input1.Key,
          TableName: 'foobar',
          ExpressionAttributeNames: m1['_ddb']().expressionAttributeNames,
        };
        expect(toGetCommandInput(input1, m1)).toEqual(expected);
      });
      it('should merge and override expression attribute names', () => {
        const params = {
          ...input1,
          ExpressionAttributeNames: {
            ['#coo']: 'coo',
            ['#blah']: 'blah2',
          },
        };
        const expected: GetCommandInput = {
          Key: input1.Key,
          TableName: 'foobar',
          ExpressionAttributeNames: { ...m1['_ddb']().expressionAttributeNames, ...params.ExpressionAttributeNames },
        };
        expect(toGetCommandInput(params, m1)).toEqual(expected);
      });
    });
  });
  describe('to delete command input', () => {
    let input2: Partial<DeleteCommandInput>;
    let input1: Partial<DeleteCommandInput>;
    beforeAll(() => {
      input2 = {
        Key: {
          num: 54,
        },
      };
      input1 = {
        Key: {
          num: 54,
        },
      };
    });
    describe('for classes extended with Model', () => {
      it('should populate unspecified properties', () => {
        const expected: DeleteCommandInput = {
          Key: input2.Key,
          TableName: 'foobar',
          ExpressionAttributeNames: m2.ddb.expressionAttributeNames,
          ExpressionAttributeValues: m2.ddb.expressionAttributeValues,
        };
        expect(toDeleteCommandInput(input2, m2)).toEqual(expected);
      });
      it('should merge and override expression attribute names', () => {
        const params = {
          ...input2,
          ExpressionAttributeNames: {
            ['#coo']: 'coo',
            ['#kay']: 'kay2',
          },
          ExpressionAttributeValues: {
            [':coo']: 'coo',
            [':kay']: 'kay2',
          },
        };
        const expected: DeleteCommandInput = {
          Key: input2.Key,
          TableName: 'foobar',
          ExpressionAttributeNames: { ...m2.ddb.expressionAttributeNames, ...params.ExpressionAttributeNames },
          ExpressionAttributeValues: { ...m2.ddb.expressionAttributeValues, ...params.ExpressionAttributeValues },
        };
        expect(toDeleteCommandInput(params, m2)).toEqual(expected);
      });
    });
    describe('for classes not extended with Model', () => {
      it('should populate unspecified properties', () => {
        const expected: DeleteCommandInput = {
          Key: input1.Key,
          TableName: 'foobar',
          ExpressionAttributeNames: m1['_ddb']().expressionAttributeNames,
          ExpressionAttributeValues: m1['_ddb'](m1).expressionAttributeValues,
        };
        expect(toDeleteCommandInput(input1, m1)).toEqual(expected);
      });
      it('should merge and override expression attribute names', () => {
        const params = {
          ...input1,
          ExpressionAttributeNames: {
            ['#coo']: 'coo',
            ['#blah']: 'blah2',
          },
          ExpressionAttributeValues: {
            [':coo']: 'coo',
            [':kay']: 'kay2',
          },
        };
        const expected: DeleteCommandInput = {
          Key: input1.Key,
          TableName: 'foobar',
          ExpressionAttributeNames: { ...m1['_ddb']().expressionAttributeNames, ...params.ExpressionAttributeNames },
          ExpressionAttributeValues: {
            ...m1['_ddb'](m1).expressionAttributeValues,
            ...params.ExpressionAttributeValues,
          },
        };
        expect(toDeleteCommandInput(params, m1)).toEqual(expected);
      });
    });
  });
  describe('to put command input', () => {
    let input2: Partial<PutCommandInput>;
    let input1: Partial<PutCommandInput>;
    beforeAll(() => {
      input2 = {
        Item: {
          num: 54,
          blah: 34,
          kay: 'abc',
          say: 'efg',
          wee: 'hij',
        },
      };
      input1 = {
        Item: {
          num: 54,
          blah: 55,
        },
      };
    });
    describe('for classes extended with Model', () => {
      it('should populate unspecified properties', () => {
        const expected: PutCommandInput = {
          Item: input2.Item,
          TableName: 'foobar',
          ExpressionAttributeNames: m2.ddb.expressionAttributeNames,
          ExpressionAttributeValues: m2.ddb.expressionAttributeValues,
        };
        expect(toPutCommandInput(input2, m2)).toEqual(expected);
      });
      it('should merge and override expression attribute names', () => {
        const params = {
          ...input2,
          ExpressionAttributeNames: {
            ['#coo']: 'coo',
            ['#kay']: 'kay2',
          },
          ExpressionAttributeValues: {
            [':coo']: 'coo',
            [':kay']: 'kay2',
          },
        };
        const expected: PutCommandInput = {
          Item: input2.Item,
          TableName: 'foobar',
          ExpressionAttributeNames: { ...m2.ddb.expressionAttributeNames, ...params.ExpressionAttributeNames },
          ExpressionAttributeValues: { ...m2.ddb.expressionAttributeValues, ...params.ExpressionAttributeValues },
        };
        expect(toPutCommandInput(params, m2)).toEqual(expected);
      });
    });
    describe('for classes not extended with Model', () => {
      it('should populate unspecified properties', () => {
        const expected: PutCommandInput = {
          Item: input1.Item,
          TableName: 'foobar',
          ExpressionAttributeNames: m1['_ddb']().expressionAttributeNames,
          ExpressionAttributeValues: m1['_ddb'](m1).expressionAttributeValues,
        };
        expect(toPutCommandInput(input1, m1)).toEqual(expected);
      });
      it('should merge and override expression attribute names', () => {
        const params = {
          ...input1,
          ExpressionAttributeNames: {
            ['#coo']: 'coo',
            ['#blah']: 'blah2',
          },
          ExpressionAttributeValues: {
            [':coo']: 'coo',
            [':kay']: 'kay2',
          },
        };
        const expected: PutCommandInput = {
          Item: input1.Item,
          TableName: 'foobar',
          ExpressionAttributeNames: { ...m1['_ddb']().expressionAttributeNames, ...params.ExpressionAttributeNames },
          ExpressionAttributeValues: {
            ...m1['_ddb'](m1).expressionAttributeValues,
            ...params.ExpressionAttributeValues,
          },
        };
        expect(toPutCommandInput(params, m1)).toEqual(expected);
      });
    });
  });
});

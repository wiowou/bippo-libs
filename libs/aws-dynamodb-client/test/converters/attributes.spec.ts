import {
  toAttributeByMethod,
  toAttributeByProperty,
  toExpressionAttributeNames,
  toExpressionAttributeValues,
  toList,
  toPropertyByAttribute,
} from '../../src/lib/converters';
import { Model2 } from '../models';

describe('attribute converters', () => {
  let m: Model2;
  beforeAll(() => {
    m = new Model2();
    m.kay = 'abc';
    m.say = 'efg';
    m.vee = 'hij';
  });
  describe('to expression attribute names', () => {
    it('should return attribute name aliases vs name', () => {
      const expected = {
        ['#kay']: 'kay',
        ['#say']: 'say',
        ['#num']: 'num',
        ['#vee']: 'wee',
        ['#blah']: 'blah',
      };
      expect(toExpressionAttributeNames(m.ddb.attributes, '#')).toEqual(expected);
    });

    it('should return attribute name aliases vs value', () => {
      const expected = {
        [':kay']: 'abc',
        [':say']: 'efg',
        [':num']: 54,
        [':vee']: 'hij',
        [':blah']: 34,
      };
      expect(toExpressionAttributeValues(m.ddb.attributes, m, ':')).toEqual(expected);
    });

    it('should return attribute name aliases vs names for methods only', () => {
      const expected = {
        ['blah']: 'blah',
      };
      expect(toAttributeByMethod(m.ddb.attributes)).toEqual(expected);
    });

    it('should return attribute name aliases vs names for methods and properties', () => {
      const expected = {
        kay: 'kay',
        say: 'say',
        num: 'num',
        wee: 'vee',
        blah: 'blah',
      };
      expect(toAttributeByProperty(m.ddb.attributes)).toEqual(expected);
    });

    it('should return attribute names vs name aliases for methods and properties', () => {
      const expected = {
        kay: '#kay',
        say: '#say',
        num: '#num',
        vee: '#wee',
        blah: '#blah',
      };
      expect(toPropertyByAttribute(m.ddb.attributes, '#')).toEqual(expected);
    });

    it('should return list of property names', () => {
      const expected = ['#num', '#kay', '#say', '#vee', '#blah'];
      expect(toList(m.ddb.attributes, '#')).toEqual(expected);
    });
  });
});

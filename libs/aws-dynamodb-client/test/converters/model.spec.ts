import { setTimeout } from 'timers/promises';

import { Model1, Model2, Model3, PersonDTO, PersonModel } from '../models';

import { toItem, toModel } from '../../src/lib/converters';

describe('model converters', () => {
  let m1: Model1;
  let m2: Model2;
  beforeAll(() => {
    m1 = new Model1();
    m2 = new Model2();
    m2.kay = 'abc';
    m2.say = 'efg';
    m2.vee = 'hij';
  });
  describe('item to model', () => {
    it('should not replace methods with values', () => {
      const item1 = {
        num: 24,
        blah: 16,
      };
      const expected = new Model1();
      expected.num = 24;
      const output1 = toModel(item1, m1);
      expected.blah = output1.blah;
      expect(output1).toEqual(expected);
      const output2 = toModel(item1, Model1);
      expected.blah = output2.blah;
      expect(output2).toEqual(expected);
    });

    it('should map all values', () => {
      const item2 = {
        num: 24,
        blah: 16,
        kay: 'rrr',
        say: 'vvv',
        wee: 'qqq',
      };
      const expected = new Model2();
      expected.num = 24;
      expected.kay = 'rrr';
      expected.say = 'vvv';
      expected.vee = 'qqq';
      const output1 = toModel(item2, m2);
      expected.blah = output1.blah;
      expect(output1).toEqual(expected);
      const output2 = toModel(item2, Model2);
      expected.blah = output2.blah;
      expect(output2).toEqual(expected);
    });

    it('should ignore properties not in the class', () => {
      const item2 = {
        num: 24,
        blah: 16,
        kay: 'rrr',
        say: 'vvv',
        who: 'qqq',
      };
      const expected = new Model2();
      expected.num = 24;
      expected.kay = 'rrr';
      expected.say = 'vvv';
      const output1 = toModel(item2, m2);
      expected.blah = output1.blah;
      expect(output1).toEqual(expected);
      const output2 = toModel(item2, Model2);
      expected.blah = output2.blah;
      expect(output2).toEqual(expected);
    });
  });

  describe('model to item', () => {
    it('should work on full models', () => {
      const expected1 = {
        num: 54,
        blah: 55,
      };
      const expected2 = {
        num: 54,
        kay: 'abc',
        say: 'efg',
        wee: 'hij',
        blah: 34,
      };
      expect(toItem(m1)).toEqual(expected1);
      expect(toItem(m2)).toEqual(expected2);
    });

    it('should work on partial models', () => {
      const m1 = new Model1();
      delete m1.num;
      const expected1 = {};
      const m2 = new Model2();
      m2.isPartial = true;
      m2.vee = 'hij';
      const expected2 = {
        num: 54,
        wee: 'hij',
      };
      expect(toItem(m1)).toEqual(expected1);
      expect(toItem(m2)).toEqual(expected2);
    });

    it('should work on derived partial models', () => {
      const m1 = new PersonDTO();
      m1.dee = 'def';
      const expected1 = { dee: 'def' };
      expect(toItem(m1)).toEqual(expected1);

      const m2 = new PersonDTO();
      m2.vee = 'hij';
      const expected2 = { wee: 'hij' };
      expect(toItem(m2)).toEqual(expected2);

      const m3 = new PersonModel();
      m3.firstName = 'Rete';
      m3.lastName = 'Zylan';
      const item3 = toItem(m3);
      const expected3 = {
        PK: 'CLUB',
        SK: 'PERSON#Rete#Zylan',
        firstName: 'Rete',
        lastName: 'Zylan',
        createdAt: item3.createdAt,
        updatedAt: item3.updatedAt,
      };
      expect(item3).toEqual(expected3);
    });

    it('should work with accessors', () => {
      const m1 = new Model3();
      const expected1 = {
        num: 4,
        kay: 'k',
        vee: 'v',
      };
      expect(toItem(m1)).toEqual(expected1);
    });

    it('should work on items that convert method to property', async () => {
      const item = {
        PK: 'CLUB',
        SK: 'PERSON#Rete#Zylan',
        firstName: 'Rete',
        lastName: 'Zylan',
        createdAt: '2023-05-01',
        updatedAt: new Date().toISOString(),
      };
      await setTimeout(20);
      const model = toModel(item, PersonModel);
      expect(model.PK()).toEqual(item.PK);
      expect(model.SK()).toEqual(item.SK);
      expect(model.firstName).toEqual(item.firstName);
      expect(model.lastName).toEqual(item.lastName);
      expect(model.createdAt()).toEqual(item.createdAt);
      expect(model.updatedAt).not.toEqual(item.updatedAt);
    });
  });
});

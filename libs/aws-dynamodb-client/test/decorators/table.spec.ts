import { Model1, Model2, Model2Derived } from '../models';

describe('Table decorator', () => {
  describe('with instance and with class', () => {
    it('should be able to access store with default name', () => {
      const m = new Model1();
      const expectedStore = {
        partitionKey: {
          name: 'num',
          propertyName: 'num',
          method: undefined,
          isAccessor: false,
        },
        sortKey: {},
        tableName: 'foobar',
        index: {},
        attributes: {
          blah: {
            propertyName: 'blah',
            name: 'blah',
            method: m.blah,
            isAccessor: false,
          },
          num: {
            propertyName: 'num',
            name: 'num',
            method: undefined,
            isAccessor: false,
          },
        },
      };
      expect(m['_ddb'](m)).toEqual(expectedStore);
      expect(Model1['ddb']).toEqual(expectedStore);
    });

    it('should be able to access store', () => {
      const m = new Model2();
      const expectedStore = {
        partitionKey: {
          name: 'num',
          propertyName: 'num',
          method: undefined,
          isAccessor: false,
        },
        sortKey: {},
        tableName: 'foobar',
        index: {
          GSI1: {
            partitionKey: {
              name: 'kay',
              propertyName: 'kay',
              method: undefined,
              isAccessor: false,
            },
            sortKey: {
              name: 'say',
              propertyName: 'say',
              method: undefined,
              isAccessor: false,
            },
          },
        },
        attributes: {
          vee: {
            propertyName: 'vee',
            name: 'wee',
            method: undefined,
            isAccessor: false,
          },
          num: {
            propertyName: 'num',
            name: 'num',
            method: undefined,
            isAccessor: false,
          },
          kay: {
            name: 'kay',
            propertyName: 'kay',
            method: undefined,
            isAccessor: false,
          },
          say: {
            name: 'say',
            propertyName: 'say',
            method: undefined,
            isAccessor: false,
          },
          blah: {
            name: 'blah',
            propertyName: 'blah',
            method: m.blah,
            isAccessor: false,
          },
        },
      };
      expect(m.ddb).toEqual(expectedStore);
      expect(Model2.ddb).toEqual(expectedStore);
    });
  });

  describe('with derived classes', () => {
    it('should include parent class attributes', () => {
      const m = new Model2Derived();
      const expectedStore = {
        partitionKey: {
          name: 'prop2',
          propertyName: 'prop2',
          method: undefined,
          isAccessor: false,
        },
        sortKey: {},
        tableName: 'foobarDerived',
        index: {
          GSI1: {
            partitionKey: {
              name: 'kay',
              propertyName: 'kay',
              method: undefined,
              isAccessor: false,
            },
            sortKey: {
              name: 'say',
              propertyName: 'say',
              method: undefined,
              isAccessor: false,
            },
          },
        },
        attributes: {
          dee: {
            propertyName: 'dee',
            name: 'dee',
            method: undefined,
            isAccessor: false,
          },
          vee: {
            propertyName: 'vee',
            name: 'wee',
            method: undefined,
            isAccessor: false,
          },
          num: {
            propertyName: 'num',
            name: 'num',
            method: undefined,
            isAccessor: false,
          },
          prop2: {
            propertyName: 'prop2',
            name: 'prop2',
            method: undefined,
            isAccessor: false,
          },
          kay: {
            name: 'kay',
            propertyName: 'kay',
            method: undefined,
            isAccessor: false,
          },
          say: {
            name: 'say',
            propertyName: 'say',
            method: undefined,
            isAccessor: false,
          },
          blah: {
            name: 'blah',
            propertyName: 'blah',
            method: m.blah,
            isAccessor: false,
          },
        },
      };
      expect(m.ddb).toEqual(expectedStore);
      expect(Model2Derived.ddb).toEqual(expectedStore);
    });
  });
});

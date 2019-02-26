// @flow

import test from 'ava';
import createQueryContext from '../../helpers/createQueryContext';
import createFieldNameTransformationInterceptor from '../../../src/factories/createFieldNameTransformationInterceptor';

test('transforms field names to camelcase', (t) => {
  const interceptor = createFieldNameTransformationInterceptor({
    format: 'CAMEL_CASE'
  });

  const afterQueryExecution = interceptor.afterQueryExecution;

  if (!afterQueryExecution) {
    throw new Error('Unexpected state.');
  }

  const result = afterQueryExecution(
    createQueryContext(),
    {
      sql: 'SELECT 1'
    },
    {
      command: 'SELECT',
      fields: [
        {
          columnID: 1,
          dataTypeID: 1,
          dataTypeModifier: 1,
          dataTypeSize: 1,
          format: '',
          name: 'foo_bar',
          tableID: 1
        }
      ],
      notices: [],
      oid: null,
      rowAsArray: false,
      rowCount: 1,
      rows: [
        {
          foo_bar: 1
        }
      ]
    }
  );

  t.deepEqual(result, {
    command: 'SELECT',
    fields: [
      {
        columnID: 1,
        dataTypeID: 1,
        dataTypeModifier: 1,
        dataTypeSize: 1,
        format: '',
        name: 'foo_bar',
        tableID: 1
      }
    ],
    oid: null,
    rowAsArray: false,
    rowCount: 1,
    rows: [
      {
        fooBar: 1
      }
    ]
  });
});

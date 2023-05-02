import React from 'react'
import { ColumnDefinitionType } from ".";
type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
}

const TableRows = <T, K extends keyof T>({ data, columns }: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`} className={`h-16 ${index%2==0 ? 'bg-gray-100' : ''}`}>
        {columns.map((column, index2) => {
          return (
            <td key={`cell-${index2}`} className={`${index2 === 0 ? 'pl-4' : ''}`}>
              {row[column.key] as any}
            </td>
          );
        }
        )}
      </tr>
    );
  });

  return (
    <tbody className='w-full'>
      {rows}
    </tbody>
  );
};

export default TableRows;
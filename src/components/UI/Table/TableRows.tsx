import { useEffect } from 'react';
import { ColumnDefinitionType } from '.';
import { TableCell } from './TableCell';
import { appActions } from '~/store';

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T & { timecontrol_inc?: number; timecontrol_limit?: number; timeclass?: string }>;
  columns: Array<ColumnDefinitionType<T, K>>;
  bodyClass?: string;
  selectable?: boolean;
};

const TableRows = <T, K extends keyof T>({
  data,
  columns,
  bodyClass,
  selectable,
}: TableRowsProps<T, K>): JSX.Element => {
  const getRow = (row: any, selectable: boolean | undefined) => {
    if (selectable) {
      const inc = row.timecontrol_inc;
      const limit = row.timecontrol_limit;
      if (inc === 0) {
        const rowData = {
          betAmount: row.bet_amount,
          category: row.timeclass,
          time: limit?.toString() + ' Min',
        };
        appActions.lobby.rowData(rowData);
      } else {
        const rowData = {
          betAmount: row.bet_amount,
          category: row.timeclass,
          time: limit?.toString() + ' | ' + inc?.toString(),
        };
        appActions.lobby.rowData(rowData);
      }
    }
  };
  useEffect(() => {
    if (data.length > 0) getRow(data[0], selectable);
  }, [data]);
  const rows = data.map((row, index) => {
    return (
      <tr
        key={`row-${index}`}
        onClick={() => getRow(row, selectable)}
        className={`h-16 ${index % 2 === 0 ? 'bg-gray-100' : ''} ${
          selectable === true ? 'hover:bg-[#50A3FF]' : ''
        }`}
      >
        {columns.map((column, index2) => {
          return (
            <td key={`cell-${index2}`} className={`${index2 === 0 ? 'pl-4' : ''}`}>
              <TableCell column={column} data={row} />
            </td>
          );
        })}
      </tr>
    );
  });

  return <tbody className={`w-full ${bodyClass}`}>{rows}</tbody>;
};

export default TableRows;

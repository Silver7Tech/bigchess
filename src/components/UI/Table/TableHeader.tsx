import { ColumnDefinitionType } from '.';
export type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
  headClass?: string;
};

const TableHeader = <T, K extends keyof T>({ columns, headClass }: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    return (
      <th key={`headCell-${index}`} className={`${index === 0 ? 'pl-4' : ''}`}>
        {column.header}
      </th>
    );
  });

  return (
    <thead className={`w-full sticky ${headClass}`}>
      <tr className="h-[44px] text-left text-xs font-medium">{headers}</tr>
    </thead>
  );
};

export default TableHeader;

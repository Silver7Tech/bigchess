import  TableHeader from './TableHeader'
import TableRows from './TableRows';
export type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number;
}

type TableProps<T, K extends keyof T> = {
  data: Array<T & {timecontrol_inc? : number, timecontrol_limit? :number, timeclass? :string}>;
  columns: Array<ColumnDefinitionType<T, K>>;
  headClass?: string;
  bodyClass?: string;
  tableClass?: string;
  selectable? : boolean;
}


export const Table = <T, K extends keyof T>({ data, columns, tableClass, headClass, bodyClass, selectable }: TableProps<T, K>): JSX.Element => {
return (
  <table className={`w-full ${tableClass}`}>
    <TableHeader columns={columns} headClass={headClass}/>
    <TableRows
      data={data}
      columns={columns}
      bodyClass={bodyClass}
      selectable={selectable}
    />
  </table>
);
};

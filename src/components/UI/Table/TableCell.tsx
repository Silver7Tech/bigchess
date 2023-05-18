import { ColumnDefinitionType } from '..';
import { Image } from '../Image.ui'
import ModeItem_1 from '~/assets/icons/1.svg';
import Edit from '~/assets/img/edit.png'

type TableCellProps<T, K extends keyof T> = {
  data: T;
  column: ColumnDefinitionType<T, K>;
};

type ChessType = {
    category: string;
    time: number;
}

export const TableCell = <T, K extends keyof T>({ data, column }: TableCellProps<T, K>): JSX.Element => {
  switch(column.key){
    case 'category':
      return(
        <p>(icon){data[column.key] as any}</p>
      )
    case 'time':
      return(
        <p>{data[column.key] as any} min</p>
      )
    case 'bet_amount':
      return(
        <p>$ {data[column.key] as any}</p>
      )
    case 'participants':
      return(
        <p>{data[column.key] as any}</p>
      )
    case 'status':
      return(
        <p>{data[column.key]?'Active':'Passive'}</p>
      )
    case 'queue':
      return(
        <p>{data[column.key] as any}</p>
      )
    case 'type':
        const temp_cell = data[column.key] as ChessType
        return(
            <div className='flex items-center gap-2'>
                <Image source={ModeItem_1}/>
                <div className='flex flex-col'>
                    <p className='font-bold'>{ temp_cell.category }</p>
                    <p>{ temp_cell.time } min</p>
                </div>
            </div>
        )
    case 'result':
        return (
            <p>{data[column.key] as any}</p>
        )
    case 'opponent':
        return (
            <p>{data[column.key] as any}</p>
        )
    case 'wager':
        return(
            <p>$ {data[column.key] as any}</p>
        )
    case 'edit':
        return(
            <Image source={Edit}/>
        )
    default: return(<></>)
  }
}

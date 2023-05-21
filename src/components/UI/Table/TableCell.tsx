import { ColumnDefinitionType } from '..';
import { Image } from '../Image.ui'
import ModeItem_1 from '~/assets/icons/1.svg';
import { Bullet, Blitz, Rapid, Standard } from '../SVG_ICONS/index';
import Edit from '~/assets/img/edit.png'

type TableCellProps<T, K extends keyof T> = {
  data: T & {timecontrol_inc? : number, timecontrol_limit? :number, timeclass? :string};
  column: ColumnDefinitionType<T, K>;
};

type ChessType = {
    category: string;
    time: number;
}

export const TableCell = <T, K extends keyof T>({ data, column }: TableCellProps<T, K>): JSX.Element => {
  switch(column.key){
    case 'category':
      const type = data.timeclass as string;
      return(
        <p className=' flex items-center gap-2 font-bold'>
          {
            type === 'bullet' ?
                <>
                  <div className='flex items-center  justify-center bg-[#1eaaff33] w-[40px] h-[40px] rounded-full'>
                    <Bullet fill='#0151FF'/>
                  </div>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </>
            : 
            type === 'blitz' ? 
              <>
                <div className='flex items-center  justify-center bg-[#1eaaff33] w-[40px] h-[40px] rounded-full'>
                  <Blitz fill='#0151FF'/>
                </div>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </>
            :
            type === 'rapid' ?
              <>
                <div className='flex items-center  justify-center bg-[#1eaaff33] w-[40px] h-[40px] rounded-full'>
                  <Rapid fill='#0151FF'/>
                </div>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </>
            :
            type === 'standard' ?
              <>
                <div className='flex items-center  justify-center bg-[#1eaaff33] w-[40px] h-[40px] rounded-full'>
                  <Standard fill='#0151FF'/>
                </div>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </>
            :
            <></>
          }
        </p>
      )
    case 'time':
      const inc = data.timecontrol_inc
      const limit = data.timecontrol_limit
      return(
        <p>
          {
            inc === 0
            ?
            limit?.toString() + ' Min'
            :
            limit?.toString() + ' | ' + inc?.toString()
          }
        </p>
      )
    case 'bet_amount':
      const value = data[column.key] as number;
      return(
        <p>
          {
            0 < value && value < 1 ?
            '¢' + value*100
            :
            '$' + value
          }
        </p>
      )
    case 'participants':
      return(
        <p>{0 | data[column.key] as any}</p>
      )
    case 'status':
      return(
        <p className='text-xs text-[#12B76A] bg-[#ECFDF3] w-[65px] rounded-lg py-[1px] text-center'>&#x2022;{' Active'}</p>
      )
    case 'queue':
      return(
        <p>{0 | data[column.key] as any }</p>
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

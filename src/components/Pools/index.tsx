import { Button, Table } from "../UI";
import { ColumnDefinitionType } from "../UI";
import { SortButton } from "../UI/Table/TableSearchMode/SortButton";
import { Pagination } from "../UI/Table/TableSearchMode/Pagination";
import { useAppState } from "~/providers/StateProvider/StateProvider";
import { Image } from "../UI";
import Clock from '~/assets/img/time.png'
import { Bullet, Blitz, Rapid, Standard } from '../UI/SVG_ICONS';
type Category = 'Bullet' | 'Blitz' | 'Rapid';

interface Pool {
  category: Category;
  time: number;
  bet_amount: number;
  participants: number ;
  status: boolean;
  queue: number
}

const columns: ColumnDefinitionType<Pool, keyof Pool>[] = [
  {
    key: 'category',
    header: 'Category',
    width: 150
  },
  {
    key: 'time',
    header: 'Time',
  },
  {
    key: 'bet_amount',
    header: 'Bet Amount'
  },
  {
    key: 'participants',
    header: 'No.of Participants'
  },
  {
    key: 'status',
    header: 'Status'
  },
  {
    key: 'queue',
    header: 'Player queue'
  }
]

const Pools: React.FC = () => {
  const { state } = useAppState();
    
  return (
    <div className="my-auto mx-12 grid grid-cols-12">
      <div className="flex flex-col justify-center border-[1px] py-6 h-fit col-span-8 border-[#B4C7D8] shadow-3xl rounded-xl">
        <div className="flex justify-between mx-6 mb-6">
          <div className="space-x-2">
            <span className="text-lg font-medium">Active Pools</span>
            <span className="bg-[#F9F5FF] rounded-xl px-2 py-1 text-xs text-purple-100 ">125 Pools</span>
          </div>
          <div>
            <SortButton columns={columns} data={state.tableData}/>
          </div>
        </div>
        <div className="max-h-[600px] block overflow-y-auto">
          <Table
            columns={columns}
            data = {state.tableData}
            headClass="bg-[#F9FAFB]"
            tableClass="table-fixed"
            selectable
          />
        </div>
        <p className="bg-[#E4E7EC] h-[1px] w-full mb-4"></p>
        <Pagination/>
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-2 flex flex-col justify-center items-center border-[1px] rounded-lg h-fit px-2 py-6 gap-2 w-[380px]">
        {
          state.rowData?.category === 'bullet'?
          <div className="rounded-full bg-[#0151FF] w-[40px] h-[40px] flex items-center justify-center"><Bullet fill='#FFFFFF'/></div>
          :
          state.rowData?.category === 'blitz'?
          <div><Blitz fill='#FFFFFF'/></div>
          :
          state.rowData?.category === 'rapid'?
          <div><Rapid fill='#FFFFFF'/></div>
          :
          state.rowData?.category === 'standard'?
          <div><Standard fill='#FFFFFF'/></div>
          :''
        }
        <p className="text-[#0151FF]">{state.rowData?.category.charAt(0).toUpperCase() + state.rowData.category.substring(1)}</p>
        <div className="flex items-center gap-2">
          <Image source={Clock}/>
          <p className="text-base">{state.rowData.time}</p>
        </div>
        <p className="text-[64px] font-bold text-[#0151FF]">
          {
            0 < state.rowData.betAmount && state.rowData.betAmount < 1 ?
            '¢' + state.rowData.betAmount*100
            :
            '$' + state.rowData.betAmount
          }
        </p>
        <div className="flex justify-between items-center w-full px-1 text-[#667085]">
          <div>
            <span className="text-xs">Player queue:</span> 
            <span className="font-bold"> 100</span>
          </div>
          <div >
          <span className="text-xs">Participants in pool:</span> 
          <span className="font-bold"> 2049</span>
          </div>
        </div>
        <Button 
          text="Confirm"
          className="w-full  bg-[#12B76A] text-white-100 "
        />
      </div>
    </div>
  );
};

export default Pools;

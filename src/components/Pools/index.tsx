import { Button, Table } from "../UI";
import { ColumnDefinitionType } from "../UI";
import { SortButton } from "../UI/Table/TableSearchMode/SortButton";
import { Pagination } from "../UI/Table/TableSearchMode/Pagination";
import { useAppState } from "~/providers/StateProvider/StateProvider";
import { Image } from "../UI";
import Bullet from "~/assets/icons/3.svg"
import Clock from '~/assets/img/time.png'
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
      <div className="flex flex-col justify-center border-[1px] py-6 col-span-8 border-[#B4C7D8] shadow-3xl rounded-xl">
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
        <Image source={Bullet}/>
        <p className="text-[#0151FF]">Bullet</p>
        <div className="flex items-center gap-2">
          <Image source={Clock}/>
          <p className="font-bold">10 MIN</p>
        </div>
        <div className="border-[0.41844px] shadow-4xl rounded-3xl px-2 border-[#b4c7d880]">
          <p className="text-[64px] font-bold text-[#0151FF]">${state.betAmount}</p>
        </div>
        <div className="flex justify-between items-center w-full px-1">
          <div>
            <span className="text-xs">Player queue:</span> 
            <span className="font-bold text-gray-300"> 100</span>
          </div>
          <div >
          <span className="text-xs">Participants in pool:</span> 
          <span className="font-bold text-gray-300"> 2049</span>
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

import { Button, Table } from '../UI';
import { ColumnDefinitionType } from '../UI';
import { SortButton } from '../UI/Table/TableSearchMode/SortButton';
import { Pagination } from '../UI/Table/TableSearchMode/Pagination';
import { Image } from '../UI';
import Clock from '~/assets/img/time.png';
import { Bullet, Blitz, Rapid, Standard } from '../UI/SVG_ICONS';
import { useAuth } from '~/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { appStore } from '~/store';
import { useEffect } from 'react';
type Category = 'Bullet' | 'Blitz' | 'Rapid';

interface Pool {
  category: Category;
  time: number;
  bet_amount: number;
  participants: number;
  status: boolean;
  queue: number;
}

const columns: ColumnDefinitionType<Pool, keyof Pool>[] = [
  {
    key: 'category',
    header: 'Category',
    width: 150,
  },
  {
    key: 'time',
    header: 'Time',
  },
  {
    key: 'bet_amount',
    header: 'Bet Amount',
  },
  {
    key: 'participants',
    header: 'No.of Participants',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'queue',
    header: 'Player queue',
  },
];

const Pools: React.FC = () => {
  const lobby = appStore.lobby.useTrackedStore();
  const totalCount = appStore.lobby.use.totalCount();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if(!isAuthenticated()){
      navigate('/');
    }
  }, [])
  return (
    <div className="my-auto mx-12 grid grid-cols-12">
      <div className="flex flex-col justify-center border-[1px] py-6 h-fit col-span-8 border-[#B4C7D8] shadow-3xl rounded-xl">
        <div className="flex justify-between mx-6 mb-6">
          <div className="space-x-2">
            <span className="text-lg font-medium">Active Pools</span>
            <span className="bg-[#F9F5FF] rounded-xl px-2 py-1 text-xs text-purple-100 ">
              {totalCount} Pools
            </span>
          </div>
          <div>
            <SortButton columns={columns} data={lobby.tableData} />
          </div>
        </div>
        <div className="max-h-[600px] block overflow-y-auto">
          <Table
            columns={columns}
            data={lobby.tableData}
            headClass="bg-[#F9FAFB]"
            tableClass="table-fixed"
            selectable
          />
        </div>
        <p className="bg-[#E4E7EC] h-[1px] w-full mb-4"></p>
        <Pagination />
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-2 flex flex-col justify-center items-center border-[1px] rounded-lg h-fit px-2 py-6 gap-2 w-[380px]">
        {lobby.rowData?.category === 'bullet' ? (
          <div className="rounded-full bg-[#0151FF] w-[40px] h-[40px] flex items-center justify-center">
            <Bullet fill="#FFFFFF" />
          </div>
        ) : lobby.rowData?.category === 'blitz' ? (
          <div className="rounded-full bg-[#0151FF] w-[40px] h-[40px] flex items-center justify-center">
            <Blitz fill="#FFFFFF" />
          </div>
        ) : lobby.rowData?.category === 'rapid' ? (
          <div className="rounded-full bg-[#0151FF] w-[40px] h-[40px] flex items-center justify-center">
            <Rapid fill="#FFFFFF" />
          </div>
        ) : lobby.rowData?.category === 'standard' ? (
          <div className="rounded-full bg-[#0151FF] w-[40px] h-[40px] flex items-center justify-center">
            <Standard fill="#FFFFFF" />
          </div>
        ) : (
          ''
        )}
        <p className="text-[#0151FF]">
          {lobby.rowData?.category.charAt(0).toUpperCase() + lobby.rowData.category.substring(1)}
        </p>
        <div className="flex items-center gap-2">
          <Image source={Clock} />
          <p className="text-base">{lobby.rowData.time}</p>
        </div>
        <p className="text-[64px] font-bold text-[#0151FF]">
          {0 < lobby.rowData.betAmount && lobby.rowData.betAmount < 1
            ? '¢' + lobby.rowData.betAmount * 100
            : '$' + lobby.rowData.betAmount}
        </p>
        <div className="flex justify-between items-center w-full px-1 text-[#667085]">
          <div>
            <span className="text-xs">Player queue:</span>
            <span className="font-bold"> 100</span>
          </div>
          <div>
            <span className="text-xs">Participants in pool:</span>
            <span className="font-bold"> 2049</span>
          </div>
        </div>
        <Button text="Confirm" className="w-full  bg-[#12B76A] text-white-100 " />
      </div>
    </div>
  );
};

export default Pools;

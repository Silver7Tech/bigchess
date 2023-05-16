import { useEffect } from "react";
import { Table } from "../UI";
import { ColumnDefinitionType } from "../UI";
import { SortButton } from "../UI/Table/TableSearchMode/SortButton";
import { useAppState } from "~/providers/StateProvider/StateProvider";
type Category = 'Bullet' | 'Blitz' | 'Rapid';

interface Pool {
  category: Category;
  time: number;
  betamount: number;
  participants: number ;
  status: boolean;
  queue: number
}
const data: Pool[] = [
  {
    category: 'Bullet' ,
    time: 5,
    betamount: 5,
    participants: 1000,
    status: true,
    queue: 12
  },
  {
    category: 'Blitz',
    time: 2,
    betamount: 10,
    participants: 1000,
    status: true,
    queue: 12
  }, 
  {
    category: 'Bullet',
    time: 3,
    betamount: 23,
    participants: 1000,
    status: true,
    queue: 12
  }, 
  {
    category: 'Rapid',
    time: 4,
    betamount: 4,
    participants: 1000,
    status: true,
    queue: 12
  },  

];

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
    key: 'betamount',
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
  const { state: {tableData}, actions: {setTableData} } = useAppState();
  useEffect(() => {
    setTableData(data);
  }, []);
  return (
    <div className="flex flex-col justify-center my-auto">
      <div>
        <div className="flex justify-between mx-6">
          <div className="space-x-2">
            <span className="text-lg font-medium">Active Pools</span>
            <span className="bg-[#F9F5FF] rounded-xl px-2 py-1 text-xs text-purple-100 ">125 Pools</span>
          </div>
          <div>
            <SortButton columns={columns} data={data}/>
          </div>
        </div>
        <Table
          columns={columns}
          data = {tableData}
        />
      </div>
    </div>
  );
};

export default Pools;

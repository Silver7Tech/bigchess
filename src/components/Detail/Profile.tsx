import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Achievement, HistoryIcon  } from '~/assets/icons'
import { useAuth } from '~/providers/AuthProvider'
import { ColumnDefinitionType, Image, Table, Star } from '~/components/UI'
// import { Pagination } from '../UI/Table/TableSearchMode/Pagination';
type ChessResult = 'Won' | 'LOST';

interface History {
    timeclass: string;
    category?: string;
    time: number;
  
    bet_amount: number;
    opponent: string;
    result: ChessResult;
    edit?: string; // optional, same as string | undefined
}
const data: History[] = [
    {
        timeclass: 'bullet',
        time: 1,
        bet_amount: 1,
        result: 'Won',
        opponent:'Olivia Rhye',
        edit: '1' 
    },
    {
      timeclass: 'standard',
      time: 1,
      bet_amount: 1,
      result: 'Won',
      opponent:'Olivia Rhye',
      edit: '1' 
  },
  {
    timeclass: 'blitz',
    time: 1,
    bet_amount: 1,
    result: 'Won',
    opponent:'Olivia Rhye',
    edit: '1' 
  },
  {
    timeclass: 'rapid',
    time: 1,
    bet_amount: 1,
    result: 'Won',
    opponent:'Olivia Rhye',
    edit: '1' 
  },
  {
    timeclass: 'standard',
    time: 1,
    bet_amount: 1,
    result: 'Won',
    opponent:'Olivia Rhye',
    edit: '1' 
  },

];

const columns: ColumnDefinitionType<History, keyof History>[] = [
  {
    key: 'category',
    header: 'Category',
  },
  {
    key: 'time',
    header: 'Time',
  },
  {
    key: 'bet_amount',
    header: 'Bet Amount ($)',
  },
  {
    key: 'opponent',
    header: 'Opponent',
  },
  {
    key: 'result',
    header: 'Results',
  },
  {
    key: 'edit',
    header: '',
    width: 'w-[50px]',
  },
];
const achievementList = [
  {
    category: 'bullet',
    score: 3259
  },
  {
    category: 'standard',
    score: 3259
  },
  {
    category: 'rapid',
    score: 3259
  },
  {
    category: 'blitz',
    score: 3259
  }
]
const ProfileDetails: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAuthenticated()){
            navigate('/');
        }
    },[])
  return (
    <div className='ml-10 w-[70vw] h-[88vh] border rounded-md'>
      <div className='border-b w-full py-4 px-6 font-medium text-lg'>
        Account Details
      </div>
      <div className="w-full overflow-y-auto overflow-x-hidden p-6 max-h-[81vh]">
        <div className="flex items-center gap-6">
          <Image source={user?.picture} className="w-32 h-32 rounded-md" />
          <div className="flex flex-col justify-between h-32">
            <p className="font-bold text-lg">{user?.nickname}</p>
            <p className="text-base">{user?.nickname}</p>
            <p className="font-bold text-lg">Level: 24</p>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <p className="flex items-center gap-2 font-bold text-base my-6"><Achievement color='white'/>Achievements</p>
          <div className="flex items-center gap-8 pl-6">
            {
              achievementList.length > 0
              ?
              achievementList?.map((achievement, index) => {
                return(
                  <Star
                    key={index}
                    text= {achievement.category}
                    score={achievement.score}
                  />
                )
              })
              :
              <p className='mx-auto my-10 text-[#667085]'>You have nothing to show for so far...</p>
            }
          </div>
        </div>
        <div className="mt-5">
          <p className="flex items-center gap-2 font-bold text-base my-6"><HistoryIcon />History</p>
          <div className='flex flex-col justify-center border-[1px] py-4 h-fit col-span-8 border-[#B4C7D8] shadow-3xl rounded-xl'>
            <div className="space-x-2 px-4 pb-4">
              <span className="text-lg font-medium">Past Matches</span>
              <span className="bg-[#F9F5FF] rounded-xl px-2 py-1 text-xs text-purple-100 ">
                 125 Matches
              </span>
            </div>
            <Table 
              data={data} 
              columns={columns} 
              headClass="bg-[#F9FAFB]"
              tableClass="table-fixed"
              selectable
            />
            <p className="bg-[#E4E7EC] h-[1px] w-full mb-4"></p>
            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;

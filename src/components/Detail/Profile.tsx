// import User from '~/assets/img/user_large.png'
import Edit from '~/assets/img/edit.png'
import Star from '~/assets/img/Star.png'
import ModeItem_1 from '~/assets/icons/1.svg'
import SideBar  from './SideBar'
import { Table, Image } from '../UI'
import { ColumnDefinitionType } from '../UI'
import { useAuth } from '~/providers/AuthProvider';

interface History {
    type: React.ReactElement;
    result: React.ReactElement;
    opponent: React.ReactElement;
    wager: React.ReactElement;
    edit?: React.ReactElement; // optional, same as string | undefined
}
const data: History[] = [
{
    type: <div className='flex items-center gap-2'><Image source={ModeItem_1}/><div className='flex flex-col'><p className='font-bold'>Standard</p><p>10 min</p></div></div>,
    result: <h1>WIN</h1>,
    opponent:<h1>Olivia Rhye</h1>,
    wager: <h1>$100.00</h1>,
    edit: <Image source={Edit}/> 
}, 
{
    type: <div className='flex items-center gap-2'><Image source={ModeItem_1}/><div className='flex flex-col'><p className='font-bold'>Standard</p><p>10 min</p></div></div>,
    result: <h1>WIN</h1>,
    opponent:<h1>Olivia Rhye</h1>,
    wager: <h1>$100.00</h1>,
    edit: <Image source={Edit}/> 
}, 
{
    type: <div className='flex items-center gap-2'><Image source={ModeItem_1}/><div className='flex flex-col'><p className='font-bold'>Standard</p><p>10 min</p></div></div>,
    result: <h1>WIN</h1>,
    opponent:<h1>Olivia Rhye</h1>,
    wager: <h1>$100.00</h1>,
    edit: <Image source={Edit}/> 
}, 
{
    type: <div className='flex items-center gap-2'><Image source={ModeItem_1}/><div className='flex flex-col'><p className='font-bold'>Standard</p><p>10 min</p></div></div>,
    result: <h1>WIN</h1>,
    opponent:<h1>Olivia Rhye</h1>,
    wager: <h1>$100.00</h1>,
    edit: <Image source={Edit}/> 
}, 
{
    type: <div className='flex items-center gap-2'><Image source={ModeItem_1}/><div className='flex flex-col'><p className='font-bold'>Standard</p><p>10 min</p></div></div>,
    result: <h1>WIN</h1>,
    opponent:<h1>Olivia Rhye</h1>,
    wager: <h1>$100.00</h1>,
    edit: <Image source={Edit}/> 
}, 
{
    type: <div className='flex items-center gap-2'><Image source={ModeItem_1}/><div className='flex flex-col'><p className='font-bold'>Standard</p><p>10 min</p></div></div>,
    result: <h1>WIN</h1>,
    opponent:<h1>Olivia Rhye</h1>,
    wager: <h1>$100.00</h1>,
    edit: <Image source={Edit}/> 
},

];

const columns: ColumnDefinitionType<History, keyof History>[] = [
{
    key: 'type',
    header: 'Mactch Type',
    width: 150
},
{
    key: 'result',
    header: 'Result',
},
{
    key: 'opponent',
    header: 'Opponent'
},
{
    key: 'wager',
    header: 'Wager'
},
{
    key: 'edit',
    header: ''
}
]

const Profile: React.FC = () => {
    const { user } = useAuth()
    return (
        <div className='flex mt-2'>
            <div className= 'ml-14'>
                <SideBar/>
            </div>
            <div className='ml-10 pr-14 w-full overflow-y-auto overflow-x-hidden max-h-[83vh]'>
                <div className='flex items-center gap-6'>
                    <Image source={user?.picture} className='w-[100px] h-[100px] rounded-full'/>
                    <div className='flex flex-col'>
                        <p className='font-bold text-2xl'>{user?.nickname}</p>
                        <p className='text-base text-gray-600'>LVL 24</p>
                    </div>
                </div>
                <div className='flex flex-col mt-5'>
                    <p className='font-bold text-2xl'>Achievements</p>
                    <div className='flex items-center gap-12'>
                        <div className='flex flex-col items-center gap-3'>
                            <Image source={Star} className='w-[80px] h-[80px]'/>
                            <Image source={ModeItem_1} className='w-[20px] h-[25px]'/>
                            <p className='font-bold text-xl text-purple-100'>1254</p>
                        </div>
                        <div className='flex flex-col items-center gap-3'>
                            <Image source={Star} className='w-[80px] h-[80px]'/>
                            <Image source={ModeItem_1} className='w-[20px] h-[25px]'/>
                            <p className='font-bold text-xl text-purple-100'>1254</p>
                        </div>
                        <div className='flex flex-col items-center gap-3'>
                            <Image source={Star} className='w-[80px] h-[80px]'/>
                            <Image source={ModeItem_1} className='w-[20px] h-[25px]'/>
                            <p className='font-bold text-xl text-purple-100'>1254</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <p className='font-bold text-2xl mb-2'>History</p>
                    <Table data={data} columns={columns} />
                </div>
            </div>
        </div>
    )
}

export default Profile;
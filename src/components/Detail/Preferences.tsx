import SideBar from "./SideBar";

const Preferences: React.FC = () => {
    return (
        <div className='mx-14 mt-2'>
        <div className= 'fixed top-28'>
            <SideBar/>
        </div>
        <div className='relative left-[300px] w-3/4'>
            <div className="flex justify-center">
                Coming Soon
            </div>
        </div>
    </div>
    );
  };
  
export default Preferences;
  
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

export default function Profile() {
  return (
    <div className="flex gap-2 items-stretch justify-center pt-4">
      <div className="ml-14">
        <SideBar />
      </div>
      <Outlet />
    </div>
  );
}

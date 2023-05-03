import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { useAppState } from "~/providers/StateProvider/StateProvider";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router'

const SideBar:React.FC = () => {
    const navigate = useNavigate()
    const {
        state: { detailMode },
        actions: { setDetailMode },
      } = useAppState();
    const activeMenu = (order: number) => {
        setDetailMode(order);
    }
    const Logout = () => {
        navigate('/play')
    }
    return (
        <Sidebar>
            <Menu  menuItemStyles={{
                button: ({ level, active }) => {
                if (level === 0)
                    return {
                        backgroundColor: active ? '#7b61ff66' : undefined,
                        border: '1.15288px solid rgba(0, 0, 0, 0.1)'
                    };
                },
            }}>
                <MenuItem active={detailMode === 0 ? true : false} component={<Link to="/profile" />} onClick={() => activeMenu(0)}> Profile </MenuItem>
                <MenuItem active={detailMode === 1 ? true : false} component={<Link to="/deposit" />} onClick={() => activeMenu(1)}>Deposit Money </MenuItem>
                <MenuItem active={detailMode === 2 ? true : false} component={<Link to="/preferences" />} onClick={() => activeMenu(2)}> Preferences </MenuItem>
                <MenuItem active={detailMode === 3 ? true : false} onClick={Logout}> Logout </MenuItem>
            </Menu>
        </Sidebar>
    )
}
export default SideBar;
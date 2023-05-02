import React from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

const SideBar:React.FC = () => {
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
                <MenuItem active={true}> Profile </MenuItem>
                <MenuItem> Deposit Money </MenuItem>
                <MenuItem> Preferences </MenuItem>
                <MenuItem> Logout </MenuItem>
            </Menu>
        </Sidebar>
    )
}
export default SideBar;
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import { Link } from 'react-router-dom';
import { useAuth } from '~/providers/AuthProvider';
import { appActions, useTrackedStore } from '~/store';
const SideBar: React.FC = () => {
  const { signOut } = useAuth();
  const detailMode = useTrackedStore().profile.currentTab();

  const onLogout = () => signOut();
  const onActivateMenuItem = (order: typeof detailMode) => appActions.profile.currentTab(order);
  return (
    <Sidebar>
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            if (level === 0)
              return {
                backgroundColor: active ? '#7b61ff66' : undefined,
                border: '1.15288px solid rgba(0, 0, 0, 0.1)',
              };
          },
        }}
      >
        <MenuItem
          active={detailMode === 'profile'}
          component={<Link to="/profile" />}
          onClick={() => onActivateMenuItem('profile')}
        >
          Profile
        </MenuItem>
        <MenuItem
          active={detailMode === 'deposit'}
          component={<Link to="/profile/deposit" />}
          onClick={() => onActivateMenuItem('deposit')}
        >
          Deposit Money
        </MenuItem>
        <MenuItem
          active={detailMode === 'settings'}
          component={<Link to="/profile/preferences" />}
          onClick={() => onActivateMenuItem('settings')}
        >
          Preferences
        </MenuItem>
        <MenuItem onClick={onLogout}> Logout </MenuItem>
      </Menu>
    </Sidebar>
  );
};
export default SideBar;

import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useAuth } from '~/providers/AuthProvider';
import { appActions, useTrackedStore } from '~/store';
import { PaymentIcon, ProfileIcon, PreferenceIcon, LogoutIcon } from '~/assets/icons'
const SideBar: React.FC = () => {
  const { signOut } = useAuth();
  const detailMode = useTrackedStore().profile.currentTab();

  const onLogout = () => signOut();
  const onActivateMenuItem = (order: typeof detailMode) => appActions.profile.currentTab(order);
  const styles = {
    container: {
      borderRightWidth: '0px',
      width: '300px'
    }
  };
  return (
    <div className='h-[88vh] border rounded-md'>
      <div className='border-b  py-4 px-5 font-medium text-lg'>
        General Information
      </div>
      <Sidebar
        style={styles.container}
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0)
                return {
                  backgroundColor: active ? '#01B6FF' : undefined,
                  border: '1.15288px solid rgba(0, 0, 0, 0.1)',
                };
            },
          }}
        >
          <MenuItem
            icon={<ProfileIcon />}
            active={detailMode === 'profile'}
            component={<Link to="/profile" />}
            onClick={() => onActivateMenuItem('profile')}
          >
            Profile
          </MenuItem>
          <MenuItem
            icon={<PaymentIcon />}
            active={detailMode === 'deposit'}
            component={<Link to="/profile/deposit" />}
            onClick={() => onActivateMenuItem('deposit')}
          >
            Payments
          </MenuItem>
          <MenuItem
            icon={<PreferenceIcon />}
            active={detailMode === 'settings'}
            component={<Link to="/profile/preferences" />}
            onClick={() => onActivateMenuItem('settings')}
          >
            Preferences
          </MenuItem>
          <MenuItem icon={<LogoutIcon />} onClick={onLogout}> Logout </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};
export default SideBar;

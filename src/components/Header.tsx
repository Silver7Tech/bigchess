import * as Dialog from '@radix-ui/react-dialog';
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router'
import { HashLink } from 'react-router-hash-link';
import Logo from '~/assets/img/logo.png';
import { AuthModal } from '~/components/Modal/Auth';
import { Button, Image } from '~/components/UI';
import { LinkButton } from '~/components/UI/LinkButton.ui';
import { useAuth } from '~/providers/AuthProvider';
import { useAppState } from '~/providers/StateProvider/StateProvider';
// import {FaChevronDown} from 'react-icons/fa';
const Header: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { state, actions } = useAppState();
  const { isAuthenticated, user } = useAuth();

  const openModal = () => {
    actions.setOpenModal(true);
  };
  const depositPage = () => {
    navigate('/profile/deposit');
    actions.setDetailMode(1);
  }
  const profilePage = () => {
    navigate('/profile');
    actions.setDetailMode(0);
  }
  return (
    <div className="lg:py-5 py-2 px-2 lg:px-5 bg-brand-800 sticky top-0 flex justify-between max-lg:text-sm z-50 border bg-white-100 ">
      <HashLink to={'/'}>
        <div className="flex justify-center items-center">
          <Image source={Logo} />
          <p className="font-libre font-Libre text-2xl ml-2">BigChess</p>
        </div>
      </HashLink>
      <div>
        <nav className="absolute top-1/2  transform -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center space-x-8">
            <li>
              <LinkButton text="Play" to="/play" actived={pathname.includes('play')} />
            </li>
            <li>
              <LinkButton text="Pools" to="/pools" actived={pathname.includes('pools')} />
            </li>
            <li>
              <LinkButton text="Leaderboard" to="/leaderboard" actived={pathname.includes('board')} />
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center">
        <div>
          {isAuthenticated() ? (
            <div className='flex items-center'>
              <div className="flex items-center gap-2 border-2 rounded-l-2xl h-[48px] px-2">
              <div className="font-bold text-purple-100">$<span>120.00</span></div>
              <Image source={user?.picture} onClick={profilePage} className='w-6 h-6 rounded-full'/>
              {/* <FaChevronDown /> */}
              </div>
              <Button
                text="Deposit"
                width="w-[91px]"
                height="h-[48px]"
                rounded="rounded-r-2xl"
                bg_color="bg-green-100"
                text_color="text-white-100"
                onClick={depositPage}
              />
            </div>
          ) : (
            <Dialog.Root
              open={state.modalOpen}
              onOpenChange={(open) => {
                actions.setOpenModal(open);

                if (!open) actions.setLoginState('login');
              }}
            >
              <Dialog.Trigger asChild>
                <Button
                  text="Login"
                  px="px-[16px]"
                  py="py-[16px]"
                  width="w-[75px]"
                  height="w-[52px]"
                  rounded="rounded-[16.6px]"
                  bg_color="bg-purple-100"
                  text_color="text-white-100"
                  onClick={openModal}
                />
              </Dialog.Trigger>

              <AuthModal />
            </Dialog.Root>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

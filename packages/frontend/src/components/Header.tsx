import { FC } from 'react';
import { Button, Image } from './UI';
import Union  from  '../assets/img/Union.png';
import { useLocation } from 'react-router-dom';
import { LinkButton } from './UI/LinkButton.ui';

const Header: FC = () => {
  const {pathname} = useLocation()

  return (
    <div className="lg:py-5 py-2 px-2 lg:px-5 bg-brand-800 sticky top-0 flex justify-between max-lg:text-sm z-50 border">
      <div className='flex justify-center items-center'>
        <Image source={Union} />
        <h1 className='font-libre text-base	'>BigChess</h1>
      </div>
      <div>
        <nav className="absolute top-1/2  transform -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center space-x-8">
            <li>
              <LinkButton
                text='Play game'
                to='/play'
                actived={pathname.includes('play')}
              />
            </li>
            <li>
              <LinkButton
                text='Game Modes'
                to='/mode'
                actived={pathname.includes('mode')}
              />
            </li>
            <li>
              <LinkButton
                text='Learderboard'
                to='/board'
                actived={pathname.includes('board')}
              />
            </li>
          </ul>
        </nav>
      </div>
      <div className='flex items-center'>
        <Button
          text='Register'
          px='px-[8px]'
          py='py-[4px]'
          bg_color='bg-purple-100'
          text_color='text-white'
        />
      </div>
    </div>
  );
};

export default Header;



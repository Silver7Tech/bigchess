import { FC } from 'react';
// import { RxHamburgerMenu } from 'react-icons/rx';
// import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button } from './UI/Button';


const Header: FC = () => {
  return (
    <>
      <div className="lg:py-10 py-5 px-6 lg:px-9 bg-brand-800 sticky top-0 flex lg:justify-end max-lg:text-sm z-50">
        {/* <div className="2xl:hidden w-full flex items-center justify-between">
          <HashLink
            to="/"
            className="font-semibold leading-loose text-white uppercase flex-shrink-0"
          >
            <img alt="kira log" className="w-32" src={KiraLog} />
          </HashLink>
          <button
            className="rounded-full bg-gradient-to-r from-brand-100 to-brand-200 px-4 py-1 text-white font-semibold"
            onClick={() => open('menu')}
          >
            <RxHamburgerMenu className="w-6 h-6" />
          </button>
        </div> */}
        <nav className="absolute top-1/2  transform -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center space-x-8">
            <li>
              <HashLink to="/#link1" className="font-semibold leading-loose text-black uppercase">
                Link 1
              </HashLink>
            </li>
            <li>
              <HashLink
                to="/#link2"
                className="font-semibold leading-loose text-black uppercase"
              >
                Link 2
              </HashLink>
            </li>
            <li>
              <HashLink to="/#link3" className="font-semibold leading-loose text-black uppercase">
                Link 3
              </HashLink>
            </li>
          </ul>
        </nav>
        <Button
          text='Login'
          px={8}
          py={4}
          bg_color='#000000'
          text_color='#ffffff'
        />
      </div>
    </>
  );
};

export default Header;



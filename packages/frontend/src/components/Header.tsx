import { FC } from 'react';
// import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Button } from './UI/Button';


const Header: FC = () => {
  return (
    <div className="lg:py-10 py-5 px-6 lg:px-9 bg-brand-800 sticky top-0 flex lg:justify-end max-lg:text-sm z-50">
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
  );
};

export default Header;



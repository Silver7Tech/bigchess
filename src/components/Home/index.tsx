import { FC } from 'react';
import { Card } from '~/components/UI';
import Material from '~/assets/img/material.svg'
import Solar from '~/assets/img/solar.svg'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/providers/AuthProvider';
import { useAppState } from '~/providers/StateProvider/StateProvider';

const Home: FC = () => {
  const { isAuthenticated } = useAuth();
  const { actions } = useAppState();
  const navigate = useNavigate();
  const goTo = (param: string) => {
    if(isAuthenticated()){
      navigate(param)
    }
    else{
      actions.setOpenModal(true);
    }
  }
  return (
    <div className='flex flex-col sm:flex-row justify-center items-center px-12 py-4 gap-5 sm:gap-20 my-auto'>
      <Card
        image = {Material}
        text='Play For Free'
        to={() => navigate('/play')}  
      />
      <Card
        image = {Solar}
        text='Wagers'
        to={() => goTo('/pools')}  
      />
    </div>
  );
};

export default Home;

import { FC } from 'react';
import { Logo, Button, Card } from '~/components/UI';

const cards = ['Quick Play', 'Computer', 'Friend']
const Home: FC = () => {
  return (
    <>
      <div className="">
        <div className='relative bg-yellow-400 h-[500px]'>
            <Logo />
            <div className='absolute flex w-full justify-center bottom-10'>
                <Button
                    text={'Button'}
                />
            </div>
        </div>

        <div className='flex flex-wrap justify-between items-center px-12 py-4'>
            {
                cards.map((text,index)=>(
                    <Card
                        key={index}
                        text={text}    
                    />
                ))
            }
        </div>
      </div>
    </>
  );
};

export default Home;
